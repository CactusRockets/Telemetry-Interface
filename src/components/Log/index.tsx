import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useWebSocket, dataProps } from "../../useWebSocket";

interface LogProps {
  onDataChange: (data: dataProps) => void;
}

function Log({ onDataChange }: LogProps) {
  const { data, isConnected } = useWebSocket(true);
  const [isOpen, setIsOpen] = useState(true);
  const [historyData, setHistoryData] = useState<dataProps[]>([]);

  useEffect(() => {
    onDataChange(data);
    setHistoryData(prevHistoryData => [...prevHistoryData, data]);
    console.log(historyData);
  }, [data]);

  return (
    <div className={styles.logMainContainer}>
      <div className={styles.logContainer}>
        {isOpen && (
          <header className={styles.contentContainer}>
            <h3>ESP32 WebSocket Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </header>
        )}
      </div>

      <a className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.modalOpenIcon}>
          {isOpen ? (
            <CaretRight size={32}></CaretRight>
          ) : (
            <CaretLeft size={32}></CaretLeft>
          )}
        </div>
      </a>
    </div>
  );
}

export default Log;
