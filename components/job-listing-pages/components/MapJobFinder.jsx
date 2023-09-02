import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({ location }) {
  const center = {
    lat: 17.974855,
    lng: 102.630867,
  };
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 11,
  // };
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const map = {
    lat: parseFloat(location?.latitude) || center.lat,
    lng: parseFloat(location?.longtitude) || center.lng,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  const memoizedPosiotn = useMemo(() => map, [map]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    // Important! Alwys set the container height explicitlya

    <GoogleMap
      center={map}
      zoom={11}
      mapContainerStyle={containerStyle}
      // onClick={handleClick}
      // options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {location && <Marker position={memoizedPosiotn} />}
    </GoogleMap>
  );
}
