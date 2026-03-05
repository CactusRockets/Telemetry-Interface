# Telemetry Dashboard — Architecture Guide

## Overview

A React + Vite telemetry dashboard for the **CACTUS Rockets** project at UnB (Universidade de Brasília). It receives real-time avionics data from an ESP32 via WebSocket and visualises altitude, velocity, acceleration, GPS position, and 3D orientation.

## Physical System

```
[Rocket Avionics (ESP32 + sensors)]
       ↓ (LoRa radio telemetry)
[Ground Station (ESP32 + LoRa + antenna)]
       ↓ (WiFi local network — usually mobile hotspot)
[Laptop running this dashboard]
       ↓ (WebSocket ws://<ESP32_IP>/ws)
[Dashboard UI]
```

The ground-station ESP32 hosts a WebSocket server. The laptop must be on the same local network (same hotspot as the ESP32).

---

## Data Format

The WebSocket sends JSON matching `RawAvionicsPacket` (see `src/types/avionics.ts`):

```typescript
interface RawAvionicsPacket {
  altitude: number;          // meters above launch point
  maximumAltitude: number;   // running maximum altitude (m)
  velocity: number;          // total speed (m/s)
  maximumVelocity: number;
  acceleration: number;      // total acceleration (m/s²)
  maximumAcceleration: number;
  velocityX/Y/Z: number;    // 3-axis velocity components
  accelerationX/Y/Z: number;// 3-axis acceleration components
  latitude: number;          // decimal degrees
  longitude: number;
  quaternion_w/x/y/z: number; // orientation quaternion (unit)
  skib1: boolean;            // drogue chute e-match fired
  skib2: boolean;            // main chute e-match fired
}
```

The hook normalises `skib1`/`skib2` into a nested `skibs: { skib1, skib2 }` object for cleaner prop passing (`AvionicsData` type).

**Recovery system:** Two skibs (electro-pyrotechnic initiators) activate the 2-stage parachute recovery:
- `skib1` → drogue chute (at apogee, high-speed descent brake)
- `skib2` → main chute (lower altitude, final landing)

---

## Source Tree

```
src/
├── types/
│   └── avionics.ts          ← AvionicsData, RawAvionicsPacket, defaultAvionicsData
│
├── hooks/
│   ├── useAvionicsData.ts   ← WebSocket hook (single connection, auto-reconnect)
│   └── useMockData.ts       ← Simulated flight data generator (test mode)
│
├── components/
│   ├── ConnectionBadge/     ← Green/red connected indicator with pulse animation
│   ├── ConfigPanel/         ← Gear button + settings modal (test mode, ESP IP)
│   ├── Map/                 ← Google Maps with dark styling, shows GPS marker
│   ├── RocketModel/         ← Three.js 3D rocket model driven by quaternions
│   ├── Log/                 ← Collapsible raw data panel (right edge)
│   └── UI/
│       ├── BorderBox/       ← MetricCard: labelled value card with green top border
│       └── SkibBox/         ← SkibIndicator: ARMED/SAFE status with coloured dot
│
└── pages/Home/
    ├── index.tsx            ← Root: calls hooks, passes data to all children
    ├── SideContainer/       ← Left sidebar: logo, status, skibs, specs, config
    ├── MainContainer/       ← Dashboard: metrics row + charts + map + 3D model
    └── GraphContainer/      ← Reusable telemetry chart (altitude / velocity / acceleration)
```

---

## Data Flow

```
Home (index.tsx)
│  useAvionicsData(ip, !testMode)  ← one WebSocket connection
│  useMockData(testMode)           ← or simulated data
│
├── Sidebar   ← receives (data, isConnected, testMode, config callbacks)
├── Dashboard ← receives (data, isConnected, testMode)
│   ├── MetricCard × 6      (reads data fields)
│   ├── GraphContainer × 3  (altitude, velocity, acceleration)
│   │    └── maintains own rolling history buffer (120 points)
│   ├── Map                 (reads lat/lng)
│   └── RocketModel         (reads quaternion_w/x/y/z)
└── DataLog   ← receives (data, isConnected) — displays JSON
```

**Key rule:** Only `Home` calls the data hooks. All other components receive `data: AvionicsData` as a prop. This means there is always exactly **one** WebSocket connection open.

---

## WebSocket Hook (`useAvionicsData`)

```typescript
useAvionicsData(ip: string, enabled: boolean)
// → { data: AvionicsData, isConnected: boolean }
```

- Connects to `ws://<ip>/ws`
- Auto-reconnects after 2 seconds on disconnect
- `enabled = false` immediately disconnects and returns `isConnected: false`
- Reconnects cleanly when `ip` changes (old connection closed, new one opened)

---

## Mock Data Generator (`useMockData`)

```typescript
useMockData(enabled: boolean)
// → { data: AvionicsData, isConnected: true }
```

Simulates a **60-second repeating flight loop** using a smooth parametric profile:

| Phase | Time (s) | Events |
|-------|---------|--------|
| Pre-launch hold | 0–3 | All zeros |
| Ascent (motor + coast) | 3–22 | Smoothstep altitude curve, velocity peaks ~79 m/s |
| Apogee | ~22 | Max altitude ~1500 m, `skib1` fires |
| Drogue descent | 22–57 | Linear descent, `skib1 = true` |
| Main chute | 36–57 | Slower descent, `skib2 = true` |
| Recovery | 57–60 | On ground, all zeros |

Quaternion orientation: slight tilt (±3.4°) + slow spin around vertical axis.
GPS position: drifts slightly from UnB Brasília (`-15.7942°, -47.8822°`).

Update rate: **10 Hz** (100 ms interval).

---

## Charts (`GraphContainer`)

Three chart instances are rendered in `Dashboard`:

| Instance | `graphType` | Series |
|----------|------------|--------|
| Altitude | `"altitude"` | altitude (green) |
| Velocity | `"velocity"` | total (green), X (blue), Y (purple), Z (yellow) |
| Acceleration | `"acceleration"` | total (green), X (blue), Y (purple), Z (yellow) |

Each chart:
- Maintains its own `history` state (last 120 data points)
- Appends a point on every `data` change **only when `isConnected`**
- Resets history when `testMode` changes (via React `key` prop on each instance)
- Uses Recharts `LineChart` with `isAnimationActive={false}` for smooth real-time updates

---

## Visual Design

### Color System (CSS custom properties in `src/index.css`)

| Variable | Value | Use |
|----------|-------|-----|
| `--bg-primary` | `#0b0f14` | Page background |
| `--bg-secondary` | `#111820` | Sidebar, log panel |
| `--bg-card` | `#161d27` | Chart and metric cards |
| `--bg-elevated` | `#1d2636` | Hover states |
| `--border-default` | `#27333f` | Card borders |
| `--green-primary` | `#4adc61` | Active status, values, accents |
| `--green-secondary` | `#2d9e45` | Buttons, card top borders |
| `--green-dim` | `rgba(74,220,97,0.12)` | Active backgrounds |
| `--text-primary` | `#dce6f0` | Main text |
| `--text-secondary` | `#8b949e` | Labels |
| `--text-muted` | `#404b58` | De-emphasised text |
| `--red` | `#e8504a` | Inactive/error state |
| `--blue` | `#5592e8` | X-axis chart series |
| `--purple` | `#a57de8` | Y-axis chart series |
| `--yellow` | `#d4a82e` | Z-axis chart series, test mode badge |
| `--font-mono` | system monospace stack | Numeric values, data log |

**Green is used sparingly**: active indicators, value highlights, card top borders, section headers in sidebar. The majority of the UI is neutral dark.

---

## Configuration Panel

Located in the sidebar footer (gear icon). Opens a modal overlay.

**Settings:**
- **Test Mode toggle** — switches data source from WebSocket to mock generator
- **ESP32 IP Address** — editable, pressing "Connect" triggers a WebSocket reconnection

The config state lives in `Home/index.tsx` and is passed down as props + callbacks. No global state management is used.

---

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_GOOGLE_API_KEY=your_google_maps_api_key_here
```

Without this, the Map panel shows a fallback "Map unavailable" message. Everything else works without it.

---

## Development

```bash
npm install   # or yarn install
npm run dev   # starts Vite dev server (default: http://localhost:5173)
npm run build # tsc type-check + Vite production build
```

To test without an ESP32, open the dashboard and enable **Test Mode** via the gear icon in the sidebar.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `vite` + `@vitejs/plugin-react` | Build tool |
| `recharts` | Real-time line charts |
| `@react-three/fiber` + `@react-three/drei` | 3D canvas for rocket model |
| `three` | WebGL 3D engine |
| `@react-google-maps/api` | Google Maps integration |
| `@phosphor-icons/react` | Icon set |

---

## 3D Rocket Model

The model file `/public/rocket model0.glb` is loaded by `RocketModel`. The quaternion from avionics data is applied directly to the Three.js group containing the model:

```typescript
const quaternion = new THREE.Quaternion(q1, q2, q3, q0); // THREE expects (x, y, z, w)
```

Note: Three.js constructor order is `(x, y, z, w)`, but the avionics convention is `(w, x, y, z)`, so `q0` maps to `w`.

The X (red), Y (green), Z (blue) axis helper stays fixed to show absolute orientation reference.

---

## Adding New Data Fields

1. Add the field to `RawAvionicsPacket` in `src/types/avionics.ts`
2. Add it to `AvionicsData` (with nested structure if needed)
3. Update `defaultAvionicsData`
4. Update the mapping in `useAvionicsData.ts` (the `setData` call)
5. Update `useMockData.ts` to generate a sensible value
6. Add a display widget in `MainContainer` or `Sidebar`
