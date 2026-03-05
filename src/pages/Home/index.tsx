import { useState } from "react";
import { useAvionicsData } from "../../hooks/useAvionicsData";
import { useMockData } from "../../hooks/useMockData";
import Sidebar from "./SideContainer";
import Dashboard from "./MainContainer";
import DataLog from "../../components/Log";
import styles from "./index.module.css";

const DEFAULT_ESP_IP = "192.168.187.235";

const Home = () => {
  const [testMode, setTestMode] = useState(false);
  const [wsIp, setWsIp] = useState(DEFAULT_ESP_IP);

  // Only one WebSocket connection is ever open at a time
  const { data: wsData, isConnected: wsConnected } = useAvionicsData(wsIp, !testMode);
  const { data: mockData, isConnected: mockConnected } = useMockData(testMode);

  const data = testMode ? mockData : wsData;
  const isConnected = testMode ? mockConnected : wsConnected;

  return (
    <div className={styles.layout}>
      <Sidebar
        data={data}
        isConnected={isConnected}
        testMode={testMode}
        onTestModeChange={setTestMode}
        wsIp={wsIp}
        onWsIpChange={setWsIp}
      />
      <Dashboard data={data} isConnected={isConnected} testMode={testMode} />
      <DataLog data={data} isConnected={isConnected} />
    </div>
  );
};

export default Home;
