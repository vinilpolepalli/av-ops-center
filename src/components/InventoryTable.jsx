import { useState, useMemo } from 'react';

const STATUS_DOT = {
  Online: 'bg-online',
  Standby: 'bg-standby',
  Offline: 'bg-offline',
};

const COLUMNS = [
  { key: 'device_id', label: 'Device ID', mono: true },
  { key: 'device_name', label: 'Name' },
  { key: 'device_type', label: 'Type' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'last_checked', label: 'Last Checked' },
  { key: 'assigned_to', label: 'Assigned To' },
];

export default function InventoryTable({ data }) {
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
          {sorted.map((row) => (
            <tr
              key={row.device_id}
              className="border-t border-border hover:bg-white/[0.03] transition-colors"
            >
              {COLUMNS.map(col => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-primary ${col.mono ? "font-mono text-xs text-accent" : ""}`}
                >
                  {col.key === 'status' ? (
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${STATUS_DOT[row.status] ?? 'bg-secondary'}`} />
                      {row.status}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
