import mapboxgl from 'mapbox-gl';
import React, { useState, useRef, useEffect } from 'react';
import { mapboxAccessToken } from '../../util/config';
import AddTree from '../addtree/AddTree';
import Slideout from '../../components/Slideout/Slideout';
import TreeAdoptionDirections from '../treedata/TreeAdoptionDirections';
import TreeData from '../treedata';
import MapLayers from './MapLayers';
import './Mapper.scss';

mapboxgl.accessToken = mapboxAccessToken;

const isMapboxSupported = mapboxgl.supported();

function Mapper() {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState([-122.34725, 37.7343787]);
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [newTreeAdded, setNewTreeAdded] = useState();
  const mapboxElRef = useRef(null); // DOM element to render map

  useEffect(() => {
    if (!map && isMapboxSupported) {
      const mapboxMap = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
        center,
        zoom,
        // Pass true to update the browser URL hash with the current zoom and lat/long of the map.
        hash: true,
      });

      // Add the geolocate and navigation controls to the map.
      mapboxMap.addControl(new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }));
      mapboxMap.addControl(new mapboxgl.NavigationControl());

      mapboxMap.on('load', () => {
        setIsMapLoaded(true)
      });

      setMap(mapboxMap);
    }
  }, []);

  return (
    <div className="App">
      <div className="map__container">
        <div className="mapBox" ref={mapboxElRef} />
      </div>

      {isMapboxSupported
        ? isMapLoaded && (
          <>
            <Slideout
              buttonText={{ left: 'ADOPT' }}
            >
              <TreeAdoptionDirections onmap />
            </Slideout>

            <AddTree
              map={map}
              setZoom={setZoom}
              center={center}
              setCenter={setCenter}
              newTreeAdded={newTreeAdded}
              setNewTreeAdded={setNewTreeAdded}
            />

            {currentTreeId && (
              <TreeData
                map={map}
                currentTreeId={currentTreeId}
                setCurrentTreeId={setCurrentTreeId}
              />
            )}

            <MapLayers
              map={map}
              setCurrentTreeId={setCurrentTreeId}
            />
          </>
        )
        : (
          <div className="map__error">
            <p>An error occurred while loading the tree map.</p>
            <p>Please make sure your computer and browser support WebGL.</p>
          </div>
        )}
    </div>
  );
}

export default Mapper;
