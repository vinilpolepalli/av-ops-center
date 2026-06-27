import { useEffect, useState } from 'react';

export default function PayloadModal({ payload, onClose }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(payload, null, 2);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-primary">Command Payload</h2>
          <div
            onClick={onClose}
            className="text-secondary hover:text-primary cursor-pointer text-sm"
          >
            ✕ Close
          </div>
        </div>

        <pre
          className="bg-json rounded-xl p-4 text-sm text-green-400 overflow-auto flex-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {json}
        </pre>

        <button
          onClick={handleCopy}
          className="self-start px-4 py-2 rounded-lg bg-surface border border-border text-sm text-primary hover:border-accent cursor-pointer transition-colors"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}
