import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const useESPIPforConection = true;

interface LogProps {
  onDataChange: ({}) => void,
}

export interface dataProps {
  maximumAltitude: number,
  altitude: number,
  maximumVelocity: number,
  velocity: number,
  maximumAcceleration: number,
  acceleration: number,
  velocityX: number,
  velocityY: number,
  velocityZ: number,
  accelerationX: number,
  accelerationY: number,
  accelerationZ: number,
  latitude: number,
  longitude: number,
  skibs: {
    skib1: boolean,
    skib2: boolean
  }
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
    skib2: false
  }
}

const rocketLaunchData: dataProps[] = [
  {
    // Lançamento
    maximumAltitude: 0,
    altitude: 0,
    maximumVelocity: 0,
    velocity: 20,
    maximumAcceleration: 0,
    acceleration: 50,
    velocityX: 5,
    velocityY: 0,
    velocityZ: 15,
    accelerationX: 2,
    accelerationY: 0,
    accelerationZ: 48,
    latitude: 34.0522,
    longitude: -118.2437,
    skibs: {
      skib1: true,
      skib2: false
    }
  },
  {
    // Subida inicial
    maximumAltitude: 300,
    altitude: 100,
    maximumVelocity: 200,
    velocity: 120,
    maximumAcceleration: 300,
    acceleration: 80,
    velocityX: 20,
    velocityY: 10,
    velocityZ: 110,
    accelerationX: 10,
    accelerationY: 5,
    accelerationZ: 75,
    latitude: 34.0525,
    longitude: -118.2439,
    skibs: {
      skib1: true,
      skib2: false
    }
  },
  {
    // Aproximando-se do apogeu
    maximumAltitude: 500,
    altitude: 450,
    maximumVelocity: 300,
    velocity: 200,
    maximumAcceleration: 400,
    acceleration: 30,
    velocityX: 40,
    velocityY: 20,
    velocityZ: 150,
    accelerationX: 15,
    accelerationY: 7,
    accelerationZ: 20,
    latitude: 34.0528,
    longitude: -118.2441,
    skibs: {
      skib1: true,
      skib2: false
    }
  },
  {
    // Apogeu
    maximumAltitude: 600,
    altitude: 600,
    maximumVelocity: 400,
    velocity: 0,
    maximumAcceleration: 500,
    acceleration: -30,
    velocityX: 60,
    velocityY: 30,
    velocityZ: 0,
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: -30,
    latitude: 34.0530,
    longitude: -118.2445,
    skibs: {
      skib1: true,
      skib2: false
    }
  },
  {
    // Descida
    maximumAltitude: 600,
    altitude: 300,
    maximumVelocity: 500,
    velocity: 180,
    maximumAcceleration: 500,
    acceleration: -50,
    velocityX: 40,
    velocityY: 20,
    velocityZ: -150,
    accelerationX: -10,
    accelerationY: -5,
    accelerationZ: -55,
    latitude: 34.0532,
    longitude: -118.2448,
    skibs: {
      skib1: true,
      skib2: true
    }
  },
  {
    // Aterrissagem
    maximumAltitude: 600,
    altitude: 0,
    maximumVelocity: 500,
    velocity: 0,
    maximumAcceleration: 500,
    acceleration: 0,
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 0,
    latitude: 34.0535,
    longitude: -118.2450,
    skibs: {
      skib1: false,
      skib2: true
    }
  }
];


function Log({ onDataChange }: LogProps) {

  const [data, setData] = useState(defaultData);
  const [historyData, setHistoryData] = useState([defaultData]);
  const [isConnected, setIsConnected] = useState(true);

  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    onDataChange(data);

    let jsonData = historyData;
    jsonData.push(data);
    setHistoryData(jsonData);
    console.log(jsonData);

  }, [data])

  const ESP32_HOSTNAME = "esp32.local";
  // Substitua pelo IP real do seu ESP32
  const ESP32_IP = "192.168.100.63";

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
