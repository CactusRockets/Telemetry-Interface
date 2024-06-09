import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const useESPIPforConection = false;

function Log() {
  const [data, setData] = useState({});
  const [, setIsConnected] = useState(true);

  const [isOpen, setIsOpen] = useState(true);

  const ESP32_HOSTNAME = "esp32.local";
  // Substitua pelo IP real do seu ESP32
  const ESP32_IP = "192.168.176.19";

  useEffect(() => {
    let gateway: string;
    if (useESPIPforConection) {
      gateway = `ws://${ESP32_IP}/ws`;
    } else {
      gateway = `ws://${ESP32_HOSTNAME}/ws`;
    }

    let websocket: WebSocket;

    const initWebSocket = () => {
      websocket = new WebSocket(gateway);

      websocket.onopen = () => {
        console.log("Conectado ao WebSocket");
        setIsConnected(true);
      };

      websocket.onclose = () => {
        console.log("Desconectado do WebSocket");
        setIsConnected(false);

        // Tenta reconectar após 2 segundos
        setTimeout(initWebSocket, 2000);
      };

      websocket.onmessage = (event) => {
        console.log("Mensagem recebida:", event.data);
        setData(JSON.parse(event.data));
      };

      websocket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };
    };

    initWebSocket();

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [ESP32_HOSTNAME]);

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
