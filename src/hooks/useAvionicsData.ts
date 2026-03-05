import { useEffect, useState } from "react";
import { AvionicsData, RawAvionicsPacket, defaultAvionicsData } from "../types/avionics";

export const useAvionicsData = (ip: string, enabled: boolean = true) => {
  const [data, setData] = useState<AvionicsData>(defaultAvionicsData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsConnected(false);
      return;
    }

    const gateway = `ws://${ip}/ws`;
    let websocket: WebSocket;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const initWebSocket = () => {
      websocket = new WebSocket(gateway);

      websocket.onopen = () => {
        console.log(`WebSocket connected to ${ip}`);
        setIsConnected(true);
      };

      websocket.onclose = () => {
        console.log("WebSocket disconnected, retrying in 2s...");
        setIsConnected(false);
        reconnectTimer = setTimeout(initWebSocket, 2000);
      };

      websocket.onmessage = (event) => {
        const packet: RawAvionicsPacket = JSON.parse(event.data);
        setData({
          ...packet,
          skibs: { skib1: packet.skib1, skib2: packet.skib2 },
        });
      };

      websocket.onerror = () => {
        // onerror is always followed by onclose — let onclose handle reconnect
      };
    };

    initWebSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (websocket) websocket.close();
    };
  }, [ip, enabled]);

  return { data, isConnected };
};
