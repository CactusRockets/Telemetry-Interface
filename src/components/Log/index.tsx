// src/App.js
import { useEffect, useState } from 'react';

const useESPIPforConection = false;

function Log() {
  const [data, setData] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const ESP32_HOSTNAME = 'esp32.local';
  // Substitua pelo IP real do seu ESP32
  const ESP32_IP = '192.168.176.19';

  useEffect(() => {
    let gateway: string;
    if(useESPIPforConection) {
      gateway = `ws://${ESP32_IP}/ws`;
    } else {
      gateway = `ws://${ESP32_HOSTNAME}/ws`;
    }

    let websocket: WebSocket;

    const initWebSocket = () => {
      websocket = new WebSocket(gateway);

      websocket.onopen = () => {
        console.log('Conectado ao WebSocket');
        setIsConnected(true);
      };

      websocket.onclose = () => {
        console.log('Desconectado do WebSocket');
        setIsConnected(false);
        setTimeout(initWebSocket, 2000); // Tenta reconectar após 2 segundos
      };

      websocket.onmessage = (event) => {
        console.log('Mensagem recebida:', event.data);
        setData(JSON.parse(event.data));
      };

      websocket.onerror = (error) => {
        console.error('WebSocket Error:', error);
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
    <div className="App">
      <header className="App-header">
        <h1>ESP32 WebSocket Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </header>
    </div>
  );
}

export default Log;
