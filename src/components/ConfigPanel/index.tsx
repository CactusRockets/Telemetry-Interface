import { useState } from 'react';
import { GearSix, X, WifiHigh, Flask } from '@phosphor-icons/react';
import styles from './index.module.css';

interface ConfigPanelProps {
  testMode: boolean;
  onTestModeChange: (enabled: boolean) => void;
  wsIp: string;
  onWsIpChange: (ip: string) => void;
}

const ConfigPanel = ({ testMode, onTestModeChange, wsIp, onWsIpChange }: ConfigPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ipInput, setIpInput] = useState(wsIp);

  const handleApplyIp = () => {
    onWsIpChange(ipInput);
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.gearBtn} onClick={() => setIsOpen(true)} title="Configuration">
        <GearSix size={18} weight="fill" />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <GearSix size={16} weight="fill" />
                <h3>CONFIGURATION</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className={styles.body}>
              <h4 className={styles.sectionLabel}>DATA SOURCE</h4>

              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <Flask size={18} weight="duotone" className={styles.toggleIcon} />
                  <div>
                    <p className={styles.toggleLabel}>Test Mode</p>
                    <p className={styles.toggleDesc}>
                      Simulate a full rocket flight with generated data
                    </p>
                  </div>
                </div>
                <button
                  className={`${styles.switchBtn} ${testMode ? styles.switchOn : ''}`}
                  onClick={() => onTestModeChange(!testMode)}
                  aria-label="Toggle test mode"
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>

              {testMode && (
                <p className={styles.testModeNote}>
                  Running simulated 60-second flight loop. All sensor values are generated.
                </p>
              )}

              <div className={styles.divider} />

              <h4 className={styles.sectionLabel}>WEBSOCKET CONNECTION</h4>

              <div className={`${styles.field} ${testMode ? styles.fieldDisabled : ''}`}>
                <label className={styles.fieldLabel}>
                  <WifiHigh size={14} />
                  ESP32 IP Address
                </label>
                <div className={styles.inputRow}>
                  <input
                    className={styles.input}
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="192.168.x.x"
                    disabled={testMode}
                    onKeyDown={(e) => e.key === 'Enter' && !testMode && handleApplyIp()}
                  />
                  <button
                    className={styles.applyBtn}
                    onClick={handleApplyIp}
                    disabled={testMode}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <span>CACTUS Rockets · Telemetry Dashboard</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigPanel;
