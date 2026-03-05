import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styles from "./index.module.css";

type MapProps = {
  latitude: number;
  longitude: number;
};

// Dark map style matching dashboard theme
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MAP_STYLES: any[] = [
  { elementType: "geometry", stylers: [{ color: "#1a2332" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0f14" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7a8899" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#27333f" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#8b949e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1d2636" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#27333f" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7a8899" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1e2d" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#404b58" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#131920" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#161d27" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#404b58" }] },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MAP_OPTIONS: any = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: MAP_STYLES,
};

const Map = ({ latitude, longitude }: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY as string,
  });

  if (loadError) {
    return (
      <div className={styles.fallback}>
        <p className={styles.fallbackLabel}>Map unavailable</p>
        <p className={styles.fallbackSub}>Check VITE_GOOGLE_API_KEY in .env</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={styles.fallback}>
        <p className={styles.fallbackLabel}>Loading map…</p>
      </div>
    );
  }

  const hasLocation = latitude !== 0 || longitude !== 0;
  // Default to UnB Brasília if no GPS fix yet
  const center = hasLocation
    ? { lat: latitude, lng: longitude }
    : { lat: -15.7942, lng: -47.8822 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={hasLocation ? 15 : 5}
      center={center}
      options={MAP_OPTIONS}
    >
      {hasLocation && <Marker position={{ lat: latitude, lng: longitude }} />}
    </GoogleMap>
  );
};

export default Map;
