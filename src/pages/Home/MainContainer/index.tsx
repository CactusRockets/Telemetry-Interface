import MetricCard from "../../../components/UI/BorderBox";
import Map from "../../../components/Map";
import RocketModel from "../../../components/RocketModel";
import GraphContainer from "../GraphContainer";
import { AvionicsData } from "../../../types/avionics";
import styles from "./index.module.css";

const D = 2; // decimal places

interface DashboardProps {
  data: AvionicsData;
  isConnected: boolean;
  testMode: boolean;
}

const Dashboard = ({ data, isConnected, testMode }: DashboardProps) => {
  return (
    <main className={styles.dashboard}>
      {testMode && (
        <div className={styles.testBanner}>
          <span>⚗ TEST MODE — Simulated flight data (60-second loop)</span>
        </div>
      )}

      {/* Key metrics row */}
      <div className={styles.metricsRow}>
        <MetricCard title="Alt. Máxima" value={`${data.maximumAltitude.toFixed(D)} m`} highlight />
        <MetricCard title="Altitude"    value={`${data.altitude.toFixed(D)} m`} />
        <MetricCard title="Vel. Máxima" value={`${data.maximumVelocity.toFixed(D)} m/s`} highlight />
        <MetricCard title="Velocidade"  value={`${data.velocity.toFixed(D)} m/s`} />
        <MetricCard title="Ac. Máxima"  value={`${data.maximumAcceleration.toFixed(D)} m/s²`} highlight />
        <MetricCard title="Aceleração"  value={`${data.acceleration.toFixed(D)} m/s²`} />
      </div>

      {/* Charts */}
      <div className={styles.chartsCol}>
        <GraphContainer
          key={`alt-${testMode}`}
          data={data}
          isConnected={isConnected}
          graphType="altitude"
          height={150}
        />
        <div className={styles.chartsRow}>
          <GraphContainer
            key={`vel-${testMode}`}
            data={data}
            isConnected={isConnected}
            graphType="velocity"
            height={140}
          />
          <GraphContainer
            key={`acc-${testMode}`}
            data={data}
            isConnected={isConnected}
            graphType="acceleration"
            height={140}
          />
        </div>
      </div>

      {/* Visuals: Map + 3D model */}
      <div className={styles.visualsRow}>
        <div className={styles.visualPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>LOCALIZAÇÃO GPS</span>
            <span className={styles.panelMeta}>
              {data.latitude.toFixed(5)}°, {data.longitude.toFixed(5)}°
            </span>
          </div>
          <div className={styles.panelContent}>
            <Map latitude={data.latitude} longitude={data.longitude} />
          </div>
        </div>

        <div className={`${styles.visualPanel} ${styles.visualPanelNarrow}`}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>ORIENTAÇÃO 3D</span>
            <span className={styles.panelMeta}>
              W{data.quaternion_w.toFixed(2)} X{data.quaternion_x.toFixed(2)} Y{data.quaternion_y.toFixed(2)} Z{data.quaternion_z.toFixed(2)}
            </span>
          </div>
          <div className={styles.panelContent}>
            <RocketModel
              q0={data.quaternion_w}
              q1={data.quaternion_x}
              q2={data.quaternion_y}
              q3={data.quaternion_z}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
