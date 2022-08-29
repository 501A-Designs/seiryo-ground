import React,{useState} from 'react';
import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function FullMap() {
  // const [mapViewport, setMapViewport] = useState({
  //   height: "100vh",
  //   width: "100wh",
  //   longitude: 2.571606,
  //   latitude: 45.226913,
  //   zoom: 5
  // });

  return(
    // <ReactMapGL
    //   {...mapViewport}
    //   mapboxApiAccessToken="MapboxToken"
    //   mapStyle= 'https://raw.githubusercontent.com/openmaptiles/maptiler-3d-gl-style/master/style.json'
    //   onViewportChange={setMapViewport}
    // >
    //   {/* <Marker longitude={-122.4} latitude={37.8} color="red" /> */}
    // </ReactMapGL>
    <Map
      // initialViewState={{
      //   longitude: -122.4,
      //   latitude: 37.8,
      //   zoom: 14
      // }}
      // style={{width: 600, height: 400}}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapLib={maplibregl}
    />
  )
}