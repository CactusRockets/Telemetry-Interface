import styles from "./index.module.css";
import cactusIcon from "../../../assets/cactus-logo.png";
import SkibIndicator from "../../../components/UI/SkibBox";
import ConnectionBadge from "../../../components/ConnectionBadge";
import ConfigPanel from "../../../components/ConfigPanel";
import { AvionicsData } from "../../../types/avionics";

const ROCKET_SPECS = [
  { label: "Motor",    value: "Tipo J"  },
  { label: "Massa",    value: "2.87 kg" },
  { label: "Compr.",   value: "1.78 m"  },
  { label: "CP",       value: "1.24 m"  },
  { label: "CG",       value: "1.65 m"  },
];

interface SidebarProps {
  data: AvionicsData;
  isConnected: boolean;
  testMode: boolean;
  onTestModeChange: (v: boolean) => void;
  wsIp: string;
  onWsIpChange: (ip: string) => void;
}

const Sidebar = ({
  data,
  isConnected,
  testMode,
  onTestModeChange,
  wsIp,
  onWsIpChange,
}: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <img src={cactusIcon} alt="Cactus Rockets" className={styles.logo} />
        <p className={styles.teamLabel}>CACTUS ROCKETS</p>
        <p className={styles.teamSub}>Telemetria v2</p>
      </div>

      <div className={styles.section}>
        <ConnectionBadge isConnected={isConnected} />
        {testMode && (
          <div className={styles.testBadge}>
            <span>MODO TESTE</span>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionLabel}>RECUPERAÇÃO</h4>
        <div className={styles.skibs}>
          <SkibIndicator text="SKIB 1" activated={data.skibs.skib1} />
          <SkibIndicator text="SKIB 2" activated={data.skibs.skib2} />
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionLabel}>FOGUETE</h4>
        <div className={styles.specs}>
          {ROCKET_SPECS.map(({ label, value }) => (
            <div key={label} className={styles.specRow}>
              <span className={styles.specLabel}>{label}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <ConfigPanel
          testMode={testMode}
          onTestModeChange={onTestModeChange}
          wsIp={wsIp}
          onWsIpChange={onWsIpChange}
        />
        <p className={styles.footer}>UnB · Brasília</p>
      </div>
    </aside>
  );
};

export default Sidebar;
