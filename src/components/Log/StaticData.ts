import { dataProps } from ".";

export const rocketLaunchData: dataProps[] = [
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