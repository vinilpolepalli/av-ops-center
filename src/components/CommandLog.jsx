export default function CommandLog({ log, onViewPayload }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-primary mb-3">Command Log</h2>
      {log.length === 0 ? (
        <p className="text-center text-secondary text-sm py-6">No commands triggered this session.</p>
      ) : (
        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
          {log.map(entry => (
            <div
              key={entry.id}
              className="flex items-center gap-3 text-sm border-b border-border pb-2 last:border-0 last:pb-0"
            >
              <span className="font-mono text-xs text-secondary whitespace-nowrap">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-primary font-medium truncate">{entry.device}</span>
              <span className="text-secondary font-mono text-xs">{entry.command}</span>
              <div
                onClick={() => onViewPayload(entry.payload)}
                className="ml-auto text-accent text-xs underline-offset-2 hover:underline cursor-pointer whitespace-nowrap"
              >
                View Payload
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
