export interface AvionicsData {
  altitude: number;
  maximumAltitude: number;
  velocity: number;
  maximumVelocity: number;
  acceleration: number;
  maximumAcceleration: number;
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

export interface RawAvionicsPacket {
  altitude: number;
  maximumAltitude: number;
  velocity: number;
  maximumVelocity: number;
  acceleration: number;
  maximumAcceleration: number;
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

export const defaultAvionicsData: AvionicsData = {
  altitude: 0,
  maximumAltitude: 0,
  velocity: 0,
  maximumVelocity: 0,
  acceleration: 0,
  maximumAcceleration: 0,
  velocityX: 0,
  velocityY: 0,
  velocityZ: 0,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 0,
  latitude: 0,
  longitude: 0,
  quaternion_w: 1,
  quaternion_x: 0,
  quaternion_y: 0,
  quaternion_z: 0,
  skibs: { skib1: false, skib2: false },
};
