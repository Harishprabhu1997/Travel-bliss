import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { google_api } from '../Api'
import _ from 'lodash';
const containerStyle = {
  width: '679px',
  height: '400px',
  marginLeft: '10px'
};

const AnyReactComponent = (props: any) => <div className='placeStyle'>{props.text}</div>;

function Map(props: any) {
  const [map, setMap] = React.useState(null)
  const { endLat, endLon, endPoint, startLat, startLon, startPoint } = props.journey

  const center = {
    lat: startLat,
    lng: startLon
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: google_api
  })



  const onLoad = React.useCallback(async function callback(map: any) {
    
    var points = [
      { lat: startLat, lng: startLon },
      { lat: endLat, lng: endLon }
    ]
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    new google.maps.Marker({
      position: { lat: startLat, lng: startLon },
      map,
      title: startPoint,
      label: 'start'
    });
    new google.maps.Marker({
      position: { lat: endLat, lng: endLon },
      map,
      title: endPoint,
      label: 'end'
    });
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  // const onUnmount = React.useCallback(function callback(map: any) {
  //   setMap(null)
  // }, [])
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      // onUnmount={onUnmount}
    >
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
