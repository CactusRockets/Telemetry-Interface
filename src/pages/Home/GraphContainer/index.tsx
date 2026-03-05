import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AvionicsData } from "../../../types/avionics";
import styles from "./index.module.css";

const HISTORY_LENGTH = 120;

type GraphType = "altitude" | "velocity" | "acceleration";

interface DataPoint {
  i: number;
  [key: string]: number;
}

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
}

const CONFIGS: Record<GraphType, { title: string; unit: string; series: SeriesConfig[] }> = {
  altitude: {
    title: "ALTITUDE",
    unit: "m",
    series: [{ key: "alt", name: "Altitude", color: "#4adc61" }],
  },
  velocity: {
    title: "VELOCITY",
    unit: "m/s",
    series: [
      { key: "vel", name: "Total", color: "#4adc61" },
      { key: "vX",  name: "X",     color: "#5592e8" },
      { key: "vY",  name: "Y",     color: "#a57de8" },
      { key: "vZ",  name: "Z",     color: "#d4a82e" },
    ],
  },
  acceleration: {
    title: "ACCELERATION",
    unit: "m/s²",
    series: [
      { key: "acc", name: "Total", color: "#4adc61" },
      { key: "aX",  name: "X",     color: "#5592e8" },
      { key: "aY",  name: "Y",     color: "#a57de8" },
      { key: "aZ",  name: "Z",     color: "#d4a82e" },
    ],
  },
};

function buildDataPoint(data: AvionicsData, type: GraphType, index: number): DataPoint {
  switch (type) {
    case "altitude":
      return { i: index, alt: data.altitude };
    case "velocity":
      return { i: index, vel: data.velocity, vX: data.velocityX, vY: data.velocityY, vZ: data.velocityZ };
    case "acceleration":
      return { i: index, acc: data.acceleration, aX: data.accelerationX, aY: data.accelerationY, aZ: data.accelerationZ };
  }
}

interface GraphContainerProps {
  data: AvionicsData;
  isConnected: boolean;
  graphType: GraphType;
  height?: number;
}

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#161d27",
    border: "1px solid #27333f",
    borderRadius: "6px",
    fontSize: "11px",
    color: "#dce6f0",
  },
  labelStyle: { color: "#8b949e" },
};

const GraphContainer = ({ data, isConnected, graphType, height = 160 }: GraphContainerProps) => {
  const [history, setHistory] = useState<DataPoint[]>([]);
  const config = CONFIGS[graphType];

  useEffect(() => {
    if (!isConnected) return;
    setHistory((prev) => {
      const point = buildDataPoint(data, graphType, prev.length + 1);
      const base = prev.length >= HISTORY_LENGTH ? prev.slice(1) : prev;
      return [...base, point];
    });
  }, [data, isConnected]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{config.title}</span>
        <span className={styles.unit}>{config.unit}</span>
      </div>

      {history.length === 0 ? (
        <div className={styles.empty} style={{ height }}>
          <span>Waiting for data…</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={history} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1d2636" />
            <XAxis
              dataKey="i"
              stroke="#27333f"
              tick={{ fill: "#404b58", fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              stroke="#27333f"
              tick={{ fill: "#404b58", fontSize: 10 }}
              tickLine={false}
              width={42}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE.contentStyle}
              labelStyle={TOOLTIP_STYLE.labelStyle}
              formatter={(val: number) => val.toFixed(2)}
            />
            <Legend
              wrapperStyle={{ fontSize: "10px", color: "#8b949e", paddingTop: "4px" }}
            />
            {config.series.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                dot={false}
                strokeWidth={1.5}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GraphContainer;
