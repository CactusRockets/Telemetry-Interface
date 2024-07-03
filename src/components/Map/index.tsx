import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

type MapProps = {
    latitude: number;
    longitude: number;
};

const mapContainerStyle = {
  width: "450px",
  height: "230px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ latitude, longitude }: MapProps) => {
  
  const [showMarker, setShowMarker] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY as string,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const location = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      onClick={() => setShowMarker(true)}
    >
      {
        showMarker &&
        <Marker position={location} />
      }
    </GoogleMap>
  );
};

export default Map;
