import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapboxLegendControl } from '@watergis/mapbox-gl-legend';
import { mapboxAccessToken } from '../../util/config';
import { treeHealth } from '../../util/treeHealth';
import AddTree from '../addtree/AddTree';
import Sidebar from '../../components/Sidebar/Sidebar';
import Slideout from '../../components/Slideout/Slideout';
import TreeAdoptionDirections from '../treedata/TreeAdoptionDirections';
import TreeData from '../treedata';
import MapLayers from './MapLayers';
import '@watergis/mapbox-gl-legend/css/styles.css';
import './Mapper.scss';
import { tilesServerEndpoints } from '../../api/apiEndpoints';

mapboxgl.accessToken = mapboxAccessToken;

const isMapboxSupported = mapboxgl.supported();
const legendTargets = [['noData', 'No Data']].concat(treeHealth.getNameValuePairs())
  .reduce((result, [name, label]) => ({
    ...result,
    [name]: typeof label === 'string'
      ? label
      : name.replace(/(^\w)/g, (m) => m.toUpperCase()),
  }), {});

function Mapper() {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState([-122.34725, 37.7343787]);
  const [currentTreeId, setCurrentTreeId] = useState(null);
  // const [newTreeAdded, setNewTreeAdded] = useState();
  const mapboxElRef = useRef(null); // DOM element to render map
  const [geolocater, setGeolocater] = useState(false);

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
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
        auto: true,
        fitBoundsOptions: { zoom: 20 },
      });

      // Add the geolocate and navigation controls to the map.
      mapboxMap.addControl(geolocate);
      mapboxMap.addControl(new mapboxgl.NavigationControl());
      mapboxMap.addControl(new MapboxLegendControl(legendTargets,
        {
          showDefault: true,
          showCheckbox: true,
          onlyRendered: false,
          reverseOrder: true,
        },
        // TODO: specifying a location doesn't work for some reason.
        'bottom-right'));

      mapboxMap.on('load', () => {
        setIsMapLoaded(true);

        // Now that the style has loaded, add the vector tile source, which will be used by the
        // TreeLayer components to generate a layer for each health type.
        mapboxMap.addSource('public.treedata', {
          type: 'vector',
          tiles: [`${tilesServerEndpoints}/public.treedata/{z}/{x}/{y}.pbf`],
        });
      });

      setMap(mapboxMap);
      setGeolocater(geolocate);
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
            <Sidebar>
              <AddTree
                map={map}
                setZoom={setZoom}
                center={center}
                setCenter={setCenter}
                geolocater={geolocater}
              />
              <Slideout
                buttonText={{ left: 'ADOPT' }}
                classNameButton="slideout__btn  slideout__btn__shape"
                classNameButtonText="slideout__btn-txt slideout__btn-txt__shape"
              >
                <TreeAdoptionDirections onmap />
              </Slideout>
            </Sidebar>

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
