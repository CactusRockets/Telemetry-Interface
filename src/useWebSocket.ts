import { useEffect, useState } from "react";

export interface dataProps {
  maximumAltitude: number;
  altitude: number;
  maximumVelocity: number;
  velocity: number;
  maximumAcceleration: number;
  acceleration: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  latitude: number;
  longitude: number;
  skibs: {
    skib1: boolean;
    skib2: boolean;
  };
}

const defaultData: dataProps = {
  maximumAltitude: 0,
  altitude: 0,
  maximumVelocity: 0,
  velocity: 0,
  maximumAcceleration: 0,
  acceleration: 0,
  velocityX: 0,
  velocityY: 0,
  velocityZ: 0,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 0,
  latitude: 0,
  longitude: 0,
  skibs: {
    skib1: true,
    skib2: false,
  },
};

const defaultData2: sensorData = {
  sensor1: 0,
  sensor2: 0
};

interface sensorData {
  sensor1: number;
  sensor2: number;
  sensor3?: number;
}

interface IUseWebSocket {
  data: sensorData,
  isConnected: boolean
}

export const useWebSocket = (useESPIPforConection: boolean): IUseWebSocket => {
  const [data, setData] = useState<sensorData>(defaultData2);
  const [isConnected, setIsConnected] = useState(false);

  const ESP32_HOSTNAME = "esp32.local";
  const ESP32_IP = "192.168.216.228";

  const webSocketConnection = () => {
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
  };

  useEffect(webSocketConnection, [useESPIPforConection]);

  return { data, isConnected };
};
