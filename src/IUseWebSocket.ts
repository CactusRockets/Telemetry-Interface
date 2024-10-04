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
  quaternionX: number;
  quaternionW: number;
  quaternionY: number;
  quaternionZ: number;
  skibs: {
    skib1: boolean;
    skib2: boolean;
  };
}

export interface rawData {
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
  skib1: boolean;
  skib2: boolean;
}

export interface sensorData {
  sensor1: number;
  sensor2: number;
  sensor3?: number;
}

export interface IUseWebSocket {
  data: dataProps,
  isConnected: boolean
}
