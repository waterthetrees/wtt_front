import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxAccessToken } from '../../util/config';
import { tilesServerEndpoints } from '../../api/apiEndpoints';
import { treeHealth } from '../../util/treeHealth';
import AddTree from '../addtree/AddTree';
import Sidebar from '../../components/Sidebar/Sidebar';
import Slideout from '../../components/Slideout/Slideout';
import TreeAdoptionDirections from '../treedata/TreeAdoptionDirections';
import TreeData from '../treedata';
import MapLayers from './MapLayers';
import { MapboxLegend } from './MapboxLegend';
import TreeLayerLegend from './TreeLayerLegend';
import './Mapper.scss';

mapboxgl.accessToken = mapboxAccessToken;

const isMapboxSupported = mapboxgl.supported();
const targets = [
  // Reverse the tree health names, so they go from good to vacant.
  ...treeHealth.getNameValuePairs().reverse(),
  ['noData', 'No Data']
]
  .map(([name, label]) => ({
    layer: name,
    label: typeof label === 'string'
      ? label
      : name.replace(/(^\w)/g, (m) => m.toUpperCase()),
    color: treeHealth.getColorByName(name, 'fill')
  }));

function Mapper() {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const mapboxElRef = useRef(null); // DOM element to render map
  const [geolocater, setGeolocater] = useState(false);

  useEffect(() => {
    if (!map && isMapboxSupported) {
      const mapboxMap = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
        center: [-122.34725, 37.7343787],
        zoom: 10,
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
      mapboxMap.addControl(new mapboxgl.NavigationControl());
      mapboxMap.addControl(geolocate);
      mapboxMap.addControl(
        new MapboxLegend({
          type: TreeLayerLegend,
          props: {
            title: 'Tree layers:',
            targets,
            defaultExpanded: true
          }
        }),
        // Add the legend at the bottom right of the map.
        'bottom-right'
      );

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

    // Somewhat mysteriously, returning this noop avoids the React warning about not being able to
    // call setState() in an unmounted component, which can happen when the user logs in and is
    // redirected back to /, and is then redirected to /go#<hash value>, which then redirects back
    // to the map with that hash value.
    return () => {};
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
                geolocater={geolocater}
              />
              <Slideout
                button={
                  <button className="slideout__btn slideout__btn__shape">
                    <div className="slideout__btn-txt slideout__btn-txt__shape">ADOPT</div>
                  </button>
                }
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
