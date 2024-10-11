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
  quaternion_w: number;
  quaternion_x: number;
  quaternion_y: number;
  quaternion_z: number;
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
  quaternion_w: number;
  quaternion_x: number;
  quaternion_y: number;
  quaternion_z: number;
  skib1: boolean;
  skib2: boolean;
}

export interface sensorData {
  sensor1: number;
  sensor2: number;
  sensor3?: number;
}

export interface IUseWebSocket {
  data: dataProps;
  isConnected: boolean;
}
