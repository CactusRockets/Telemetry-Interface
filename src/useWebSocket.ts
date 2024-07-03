import { useEffect, useState } from "react";
import { IUseWebSocket, dataProps, rawData } from "./IUseWebSocket";

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

export const useWebSocket = (useESPIPforConection: boolean): IUseWebSocket => {
  const [data, setData] = useState<dataProps>(defaultData);
  const [isConnected, setIsConnected] = useState(false);

  const ESP32_HOSTNAME = "esp32.local";
  const ESP32_IP = "192.168.13.235";
  
  const putData = (rawData: rawData) => {
    const data : dataProps = {
      maximumAltitude: rawData.maximumAltitude,
      altitude: rawData.altitude,
      maximumVelocity: rawData.maximumVelocity,
      velocity: rawData.velocity,
      maximumAcceleration: rawData.maximumAcceleration,
      acceleration: rawData.acceleration,
      velocityX: rawData.velocityX,
      velocityY: rawData.velocityY,
      velocityZ: rawData.velocityZ,
      accelerationX: rawData.accelerationX,
      accelerationY: rawData.accelerationY,
      accelerationZ: rawData.accelerationZ,
      latitude: rawData.latitude,
      longitude: rawData.longitude,
      skibs: {
        skib1: rawData.skib1,
        skib2: rawData.skib2,
      },
    }
    setData(data);
  }

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
        putData(JSON.parse(event.data));
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
