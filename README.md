# AV Ops Center

**GitHub:** https://github.com/vinilpolepalli/av-ops-center

Dark-mode AV operations dashboard with role-based access control (RBAC). Connects two simulated spreadsheet data sources — AV Equipment Inventory and Staff Shift Schedules — into a unified interface.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo Credentials

| Role       | Username   | Password |
|------------|------------|----------|
| Technician | technician | tech123  |
| Manager    | manager    | mgr456   |

## Mock Data Sources

- **Spreadsheet A (AV Equipment Inventory):** `src/data/inventory.js` — 6 devices (projectors, displays, amplifiers, switchers, cameras, ceiling mics)
- **Spreadsheet B (Staff Shift Schedules):** `src/data/shifts.js` — 5 shifts across two dates

## Testing the Roles

### As Technician (`technician / tech123`)
1. Log in — both data tables are visible and populated
2. Verify the Device Command Panel is **completely absent from the page** (not hidden — not in the DOM at all)
3. Sign out

### As Manager (`manager / mgr456`)
1. Log in — both data tables are visible
2. The **Device Command Panel** appears below the tables
3. Select a device (e.g. "Sony VPL-FHZ85") and a command (e.g. "power_on")
4. Click **"Trigger Device Command"**
5. The **JSON control payload appears inline in the Device Command Panel**, directly below the controls — look for the green monospaced code block
6. Click **"Copy to Clipboard"** to copy the raw JSON and paste it anywhere to verify it's valid
7. The **Command Log** below the panel shows a timestamped entry for every triggered command
8. Click **"View Payload"** on any log entry to re-open the payload in a modal
9. Press Escape or click outside the modal to close it

## JSON Payload Structure

When a Manager triggers a command, the app generates a structured JSON control payload:

```json
{
  "schema_version": "1.0",
  "payload_id": "<uuid-v4>",
  "timestamp": "<ISO 8601 UTC>",
  "triggered_by": {
    "username": "manager",
    "role": "manager"
  },
  "target_device": {
    "device_id": "projector_1",
    "device_name": "Sony VPL-FHZ85",
    "device_type": "Projector",
    "location": "Conference Room A"
  },
  "command": {
    "action": "power_on",
    "parameters": null
  },
  "status": "dispatched"
}
```

## Notes

- No backend, no database, no external API calls — fully self-contained
- Session state is in-memory only (resets on page refresh, as designed)
- RBAC is enforced at the rendering level: the command panel is conditionally excluded from the DOM for Technician accounts, not just hidden
