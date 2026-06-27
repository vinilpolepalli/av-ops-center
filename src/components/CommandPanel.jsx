import { useState } from 'react';

const COMMANDS = [
  'power_on',
  'power_off',
  'reboot',
  'set_input_hdmi1',
  'set_input_hdmi2',
  'mute',
  'unmute',
  'brightness_max',
  'brightness_min',
];

export default function CommandPanel({ inventory, user, onCommandTriggered }) {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [selectedCommand, setSelectedCommand] = useState('');
  const [additionalParams, setAdditionalParams] = useState('');
  const [currentPayload, setCurrentPayload] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState('');
  const [scanKey, setScanKey] = useState(0);

  const handleTrigger = () => {
    if (!selectedDeviceId || !selectedCommand) {
      setError('Please select both a device and a command.');
      return;
    }
    setError('');

    const device = inventory.find(d => d.device_id === selectedDeviceId);

    let parsedParams = null;
    if (additionalParams.trim()) {
      try {
        parsedParams = JSON.parse(additionalParams);
      } catch {
        parsedParams = { raw: additionalParams };
      }
    }

    const payload = {
      schema_version: '1.0',
      payload_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      triggered_by: {
        username: user.username,
        role: user.role,
      },
      target_device: {
        device_id: device.device_id,
        device_name: device.device_name,
        device_type: device.device_type,
        location: device.location,
      },
      command: {
        action: selectedCommand,
        parameters: parsedParams,
      },
      status: 'dispatched',
    };

    setCurrentPayload(payload);
    setScanKey(k => k + 1);
    onCommandTriggered({
      id: payload.payload_id,
      timestamp: payload.timestamp,
      device: device.device_name,
      command: selectedCommand,
      payload,
    });
  };

  const handleCopy = () => {
    if (!currentPayload) return;
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2))
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-5">
      <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
        ⚡ Device Command Panel
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-secondary">Device</label>
          <select
            value={selectedDeviceId}
            onChange={e => setSelectedDeviceId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0F1117] border border-border text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select device…</option>
            {inventory.map(d => (
              <option key={d.device_id} value={d.device_id}>
                {d.device_name} — {d.location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-secondary">Command</label>
          <select
            value={selectedCommand}
            onChange={e => setSelectedCommand(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#0F1117] border border-border text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select command…</option>
            {COMMANDS.map(cmd => (
              <option key={cmd} value={cmd}>{cmd}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-secondary">Additional Parameters (JSON, optional)</label>
        <textarea
          value={additionalParams}
          onChange={e => setAdditionalParams(e.target.value)}
          placeholder='{"input": "HDMI1"}'
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-[#0F1117] border border-border text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono"
        />
      </div>

      {error && <p className="text-sm text-offline">{error}</p>}

      <button
        onClick={handleTrigger}
        className="self-start px-5 py-2.5 rounded-lg bg-accent hover:bg-blue-600 text-white font-semibold text-sm cursor-pointer transition-colors"
      >
        Trigger Device Command
      </button>

      {currentPayload && (
        <div className="flex flex-col gap-3">
          <pre
            key={scanKey}
            className="scanline-anim bg-json rounded-xl p-4 text-sm text-green-400 overflow-auto max-h-80"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {JSON.stringify(currentPayload, null, 2)}
          </pre>
          <button
            onClick={handleCopy}
            className="self-start px-4 py-2 rounded-lg bg-surface border border-border text-sm text-primary hover:border-accent cursor-pointer transition-colors"
          >
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  );
}
