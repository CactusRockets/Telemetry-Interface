import { useEffect, useRef, useState } from "react";
import { AvionicsData } from "../types/avionics";

const CYCLE_S = 60;
const MAX_ALT = 1500; // meters
const BASE_LAT = -15.7942; // UnB, Brasília
const BASE_LNG = -47.8822;

/**
 * Altitude profile as a function of time t (seconds, 0..CYCLE_S).
 * Uses a smoothstep for ascent and linear descent.
 */
function altProfile(t: number): number {
  if (t < 3) return 0; // pre-launch hold
  if (t < 22) {
    // Powered ascent + coast (3s→22s)
    const p = (t - 3) / 19;
    return MAX_ALT * p * p * (3 - 2 * p); // cubic smoothstep
  }
  if (t < 57) {
    // Descent under parachute (22s→57s)
    const p = (t - 22) / 35;
    return MAX_ALT * (1 - p);
  }
  return 0; // recovery
}

function computeFrame(elapsedMs: number): AvionicsData {
  const t = (elapsedMs / 1000) % CYCLE_S;
  const h = 0.04; // finite-difference step (s)

  const alt = altProfile(t);
  const altFwd = altProfile(t + h);
  const altBwd = altProfile(Math.max(0, t - h));

  // First and second derivatives → velocity and acceleration
  const vel = (altFwd - altBwd) / (2 * h);
  const acc = (altFwd - 2 * alt + altBwd) / (h * h);

  // Running maxima for the current cycle position
  let maxAlt = 0, maxVel = 0, maxAcc = 0;
  for (let s = 0; s <= t; s += 0.25) {
    const a = altProfile(s);
    const ap = altProfile(s + h);
    const am = altProfile(Math.max(0, s - h));
    const v = Math.abs((ap - am) / (2 * h));
    const ac = Math.abs((ap - 2 * a + am) / (h * h));
    if (a > maxAlt) maxAlt = a;
    if (v > maxVel) maxVel = v;
    if (ac > maxAcc) maxAcc = ac;
  }

  // Orientation: slight tilt + spin around vertical axis
  const tiltAngle = 0.06 * Math.sin(t * 0.4); // ±3.4° wobble
  const spinAngle = t * 0.8;                   // slow spin
  const halfTilt = tiltAngle / 2;
  const halfSpin = spinAngle / 2;
  // Quaternion for rotation: tilt around horizontal, then spin around Z
  const q_w = Math.cos(halfTilt) * Math.cos(halfSpin);
  const q_x = Math.sin(halfTilt) * Math.sin(halfSpin);
  const q_y = Math.sin(halfTilt) * Math.cos(halfSpin);
  const q_z = Math.cos(halfTilt) * Math.sin(halfSpin);

  // GPS drift from launch site
  const drift = 0.0006 * (t / CYCLE_S);
  const lat = BASE_LAT + drift * Math.cos(t * 0.25);
  const lng = BASE_LNG + drift * Math.sin(t * 0.25);

  // Component velocities — mostly vertical with small lateral noise
  const vX = vel * Math.sin(t * 0.3) * 0.05 + Math.sin(t * 1.1) * 0.4;
  const vY = vel * Math.cos(t * 0.3) * 0.04 + Math.cos(t * 0.9) * 0.3;
  const vZ = vel + Math.sin(t * 2.5) * 0.6;

  // Component accelerations
  const aX = acc * Math.sin(t * 0.4) * 0.04 + Math.sin(t * 1.7) * 0.25;
  const aY = acc * Math.cos(t * 0.4) * 0.03 + Math.cos(t * 2.1) * 0.2;
  const aZ = acc + Math.sin(t * 3.0) * 0.35;

  // Recovery system: drogue at apogee, main mid-descent
  const skib1 = t >= 21 && t < 57;
  const skib2 = t >= 36 && t < 57;

  return {
    altitude: Math.max(0, alt),
    maximumAltitude: Math.max(0, maxAlt),
    velocity: vel,
    maximumVelocity: maxVel,
    acceleration: acc,
    maximumAcceleration: maxAcc,
    velocityX: vX,
    velocityY: vY,
    velocityZ: vZ,
    accelerationX: aX,
    accelerationY: aY,
    accelerationZ: aZ,
    latitude: lat,
    longitude: lng,
    quaternion_w: q_w,
    quaternion_x: q_x,
    quaternion_y: q_y,
    quaternion_z: q_z,
    skibs: { skib1, skib2 },
  };
}

export const useMockData = (enabled: boolean = true) => {
  const startRef = useRef(Date.now());
  const [data, setData] = useState<AvionicsData>(computeFrame(0));

  useEffect(() => {
    if (!enabled) return;

    startRef.current = Date.now();
    setData(computeFrame(0));

    const interval = setInterval(() => {
      setData(computeFrame(Date.now() - startRef.current));
    }, 100); // 10 Hz

    return () => clearInterval(interval);
  }, [enabled]);

  return { data, isConnected: enabled };
};
