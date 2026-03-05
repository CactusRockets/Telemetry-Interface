import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AvionicsData } from "../../types/avionics";
import styles from "./index.module.css";

interface DataLogProps {
  data: AvionicsData;
  isConnected: boolean;
}

function DataLog({ data, isConnected }: DataLogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Hide log" : "Show raw data log"}
      >
        {isOpen ? <CaretRight size={14} weight="bold" /> : <CaretLeft size={14} weight="bold" />}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>RAW TELEMETRY</span>
            <span className={isConnected ? styles.live : styles.offline}>
              {isConnected ? "● LIVE" : "○ OFFLINE"}
            </span>
          </div>
          <pre className={styles.data}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Re-export AvionicsData so existing files that imported dataProps from here can still compile
export type { AvionicsData as dataProps };
export default DataLog;
