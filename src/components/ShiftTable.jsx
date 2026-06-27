import { useState, useMemo } from 'react';

const TODAY = new Date().toISOString().slice(0, 10);

const COLUMNS = [
  { key: 'shift_id', label: 'Shift ID', mono: true },
  { key: 'staff_name', label: 'Staff' },
  { key: 'role_title', label: 'Role' },
  { key: 'date', label: 'Date' },
  { key: 'shift_start', label: 'Start' },
  { key: 'shift_end', label: 'End' },
  { key: 'location', label: 'Location' },
  { key: 'notes', label: 'Notes' },
];

export default function ShiftTable({ data }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-secondary">
            {COLUMNS.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-3 font-medium cursor-pointer select-none whitespace-nowrap hover:text-primary transition-colors"
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1 text-accent">{sortDir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr
              key={row.shift_id}
              className={`border-t border-border hover:bg-white/[0.03] transition-colors ${
                row.date === TODAY ? 'border-l-2 border-l-accent' : ''
              }`}
            >
              {COLUMNS.map(col => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-primary ${col.mono ? "font-mono text-xs text-accent" : ""}`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
