import { useState } from 'react';
import RoleBadge from './RoleBadge';
import InventoryTable from './InventoryTable';
import ShiftTable from './ShiftTable';
import CommandPanel from './CommandPanel';
import CommandLog from './CommandLog';
import PayloadModal from './PayloadModal';
import { INVENTORY } from '../data/inventory';
import { SHIFTS } from '../data/shifts';

export default function Dashboard({ user, onLogout }) {
  const [commandLog, setCommandLog] = useState([]);
  const [modalPayload, setModalPayload] = useState(null);

  const canTriggerCommands = user.role === 'manager';

  const handleCommandTriggered = (entry) => {
    setCommandLog(prev => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface border-b border-border px-6 py-3 flex items-center justify-between">
        <span className="text-base font-bold text-primary tracking-wide">AV Ops Center</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-secondary">{user.displayName}</span>
          <RoleBadge role={user.role} />
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-accent cursor-pointer transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-primary">AV Equipment Inventory</h2>
              <p className="text-xs text-secondary mt-0.5">Spreadsheet A · {INVENTORY.length} devices</p>
            </div>
            <InventoryTable data={INVENTORY} />
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-primary">Staff Shift Schedule</h2>
              <p className="text-xs text-secondary mt-0.5">Spreadsheet B · {SHIFTS.length} shifts</p>
            </div>
            <ShiftTable data={SHIFTS} />
          </div>
        </div>

        {canTriggerCommands && (
          <>
            <CommandPanel
              inventory={INVENTORY}
              user={user}
              onCommandTriggered={handleCommandTriggered}
            />
            <CommandLog log={commandLog} onViewPayload={setModalPayload} />
          </>
        )}
      </main>

      {modalPayload && (
        <PayloadModal payload={modalPayload} onClose={() => setModalPayload(null)} />
      )}
    </div>
  );
}
