// import GoogleMapReact from "google-map-react";
// const AnyReactComponent = ({ text }) => (
//   <div>
//     <i className=" fa fa-map-marker-alt fa-3x" style={{ color: "red"}} ></i>
//   </div>
// );

// export default function Map({ location }) {
//   // const defaultProps = {
//   //   center: {
//   //     lat: 17.974528,
//   //     lng: 102.613361,
//   //   },
//   //   zoom: 12,
//   // };
//   // function createMapOptions(maps) {
//   //   // next props are exposed at maps
//   //   // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
//   //   // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
//   //   // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
//   //   // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
//   //   // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
//   //   return {
//   //     zoomControlOptions: {
//   //       position: maps.ControlPosition.RIGHT_CENTER,
//   //       style: maps.ZoomControlStyle.SMALL
//   //     },
//   //     mapTypeControlOptions: {
//   //       position: maps.ControlPosition.TOP_RIGHT
//   //     },
//   //     mapTypeControl: true
//   //   };
//   // }
//   // const _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)

//   // return (
//   //   // Important! Alwys set the container height explicitlya

//   //   <GoogleMapReact
//   //     bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
//   //     defaultCenter={defaultProps.center}
//   //     center={location}
//   //     defaultZoom={defaultProps.zoom}
//   //     options={createMapOptions}
//   //     onClick={_onClick}
//   //   >

//   //     <AnyReactComponent
//   //       lat={location === null ? defaultProps.center.lat : location?.lat}
//   //       lng={location === null ? defaultProps.center.lng : location?.lng}
//   //       text="My Marker"
//   //     />
//   //   </GoogleMapReact>
//   // );
// }
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
// const Map = withScriptjs(
//   withGoogleMap((props) => (
//     <GoogleMap
//       defaultZoom={11}
//       defaultCenter={{
//         lat:17.974855 ,
//         lng: 102.630867,
//       }}
//     >
//       {props.isMarkerShown && (
//         <Marker
//           position={{ lat: props?.location?.lat, lng: props?.location?.lng }}
//         />
//       )}
//     </GoogleMap>
//   ))

// );

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
    return Object.values(location).every((value) => value === 0);
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
