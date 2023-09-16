import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 17.974855,
  lng: 102.630867,
};

const Map = ({ location, handleClick }) => {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  // })
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const memoizedPosiotn = useMemo(() => location, [location]);
  // const defaultCenter = useMemo(
  //   () => ({ lat: 17.974855, lng: 102.630867 }),
  //   []
  // );

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;
  // Default center value if no center prop is passed in

  // Use the center prop if it's provided, otherwise use the default center
  const checkAllValuesZero = () => {
    return Object.values(location || {}).every((value) => value === 0);
  };
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={checkAllValuesZero() ? center : location}
      zoom={10}
      onClick={handleClick}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {location && <Marker position={memoizedPosiotn} />}
    </GoogleMap>
  );
};

export default React.memo(Map);
