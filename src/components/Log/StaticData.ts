import { AvionicsData } from "../../types/avionics";

// Static sample data for reference / testing (not used at runtime)
export const rocketLaunchData: AvionicsData[] = [
  {
    altitude: 0, maximumAltitude: 0,
    velocity: 20, maximumVelocity: 0,
    acceleration: 50, maximumAcceleration: 0,
    velocityX: 5, velocityY: 0, velocityZ: 15,
    accelerationX: 2, accelerationY: 0, accelerationZ: 48,
    latitude: -15.7942, longitude: -47.8822,
    quaternion_w: 1, quaternion_x: 0, quaternion_y: 0, quaternion_z: 0,
    skibs: { skib1: false, skib2: false },
  },
  {
    altitude: 600, maximumAltitude: 600,
    velocity: 200, maximumVelocity: 200,
    acceleration: 30, maximumAcceleration: 120,
    velocityX: 20, velocityY: 10, velocityZ: 190,
    accelerationX: 2, accelerationY: 1, accelerationZ: 28,
    latitude: -15.7940, longitude: -47.8820,
    quaternion_w: 0.99, quaternion_x: 0.01, quaternion_y: 0.01, quaternion_z: 0.1,
    skibs: { skib1: false, skib2: false },
  },
  {
    altitude: 1500, maximumAltitude: 1500,
    velocity: 0, maximumVelocity: 300,
    acceleration: -9.8, maximumAcceleration: 120,
    velocityX: 1, velocityY: 0.5, velocityZ: 0,
    accelerationX: 0, accelerationY: 0, accelerationZ: -9.8,
    latitude: -15.7938, longitude: -47.8818,
    quaternion_w: 0.98, quaternion_x: 0.02, quaternion_y: 0.02, quaternion_z: 0.18,
    skibs: { skib1: true, skib2: false },
  },
  {
    altitude: 0, maximumAltitude: 1500,
    velocity: -4, maximumVelocity: 300,
    acceleration: 0, maximumAcceleration: 120,
    velocityX: 0, velocityY: 0, velocityZ: -4,
    accelerationX: 0, accelerationY: 0, accelerationZ: 0,
    latitude: -15.7935, longitude: -47.8815,
    quaternion_w: 1, quaternion_x: 0, quaternion_y: 0, quaternion_z: 0,
    skibs: { skib1: true, skib2: true },
  },
];
