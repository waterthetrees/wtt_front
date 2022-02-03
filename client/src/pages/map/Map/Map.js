import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Alert, Box, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import { mapboxAccessToken } from '@/util/config';
import { tilesServerEndpoints } from '@/api/apiEndpoints';
import { treeHealth } from '@/util/treeHealth';
import NewTree from '../NewTree/NewTree';
import Adopt from '../Adopt/Adopt';
import { MapboxControlPortal } from './MapboxControlPortal';
import MapLayers from './MapLayers';
import TreeLayerLegend from './TreeLayerLegend';
import './Map.css';

mapboxgl.accessToken = mapboxAccessToken;

const isMapboxSupported = mapboxgl.supported();
const unsupportedError = (
  <Box
    sx={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    }}
  >
    <Alert severity="error">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>An error occurred while loading the tree map.</Typography>
      <Typography variant="body1">Please make sure your computer and browser support WebGL.</Typography>
    </Alert>
  </Box>
);

function createPopupHTML({ common, scientific }) {
  const commonString = common
    ? `<h4>${common}</h4>`
    : '';
  const scientificString = scientific && scientific !== common
    ? `<h5>${scientific}</h5>`
    : '';

  return `<div>${commonString}${scientificString}</div>`;
}

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

const layers = [
  // Reverse the tree health names, so they go from good to vacant.
  ...treeHealth.getNameValuePairs().reverse(),
  ['noData', 'No Data'],
]
  .map(([id, label]) => ({
    id,
    label: typeof label === 'string'
      ? label
      : id.replace(/(^\w)/g, (m) => m.toUpperCase()),
    color: treeHealth.getColorByName(id, 'fill'),
  }));
const layerIDs = [
  ...layers.map(({ id }) => id),
  // Include the editedTrees layer, so that a mouseover on a newly-added or -edited tree will show
  // its popup.
  'editedTrees',
];

export default function Map({
  containerRef, currentTreeData, setCurrentTreeId, selectionEnabled, onLoad,
}) {
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const queryClient = useQueryClient();
  const selectionEnabledRef = useRef(selectionEnabled);
  const currentFeature = useRef(null);

// TODO: maybe use a class for Map so that event handlers bound to the instance can look at
//  this.props.selectionEnabled instead of having to mirror it in a ref like this

  useEffect(() => {
    selectionEnabledRef.current = selectionEnabled;

    if (!selectionEnabled) {
      map.getCanvas().style.cursor = '';
      popup.remove();
      currentFeature.current = null;
    }
  }, [selectionEnabled]);

  useEffect(() => {
    if (isMapboxSupported && !map && containerRef.current) {
      const mapboxMap = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
        center: [-122.34725, 37.7343787],
        zoom: 10,
        // Pass true to update the browser URL hash with the current zoom and lat/long of the map.
        hash: true,
      });

      // Add the navigation and geolocate controls to the map.
      mapboxMap.addControl(new mapboxgl.NavigationControl());
      mapboxMap.addControl(new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
        auto: true,
        fitBoundsOptions: { zoom: 20 },
      }));

      mapboxMap.on('load', () => {
        // For some reason, calling setIsMapLoaded() before onLoad() will cause errors, so keep them
        // in this order.
        onLoad(mapboxMap);
        setIsMapLoaded(true);

        // Now that the style has loaded, add the vector tile source, which will be used by the
        // TreeLayer components to generate a layer for each health type.
        mapboxMap.addSource('public.treedata', {
          type: 'vector',
          tiles: [`${tilesServerEndpoints}/public.treedata/{z}/{x}/{y}.pbf`],
        });

        // Wait until the map is loaded to add mouse event handlers so that we don't try to query
        // layers when the mouse moves before they've been added and loaded.
        mapboxMap.on('click', ({ point: { x, y } }) => {
          if (!selectionEnabledRef.current) {
            return;
          }

          const [feature] = mapboxMap.queryRenderedFeatures([x, y], { layers: layerIDs });

          if (feature) {
            const { properties, properties: { id } } = feature;
            const queryKeys = ['trees', { id }];

            // Cache the properties from the vector tile as the data for the /trees query that will
            // be triggered by the setCurrentTreeId() call below.  The TreeDetailsPanel will first
            // get this cached data and then update it when the server response comes back.  But
            // only do this if there's no cached data already.  If there is, that data is presumably
            // the latest response from the server, so we don't want to override it with older data
            // from the vector tile.
            if (!queryClient.getQueryState(queryKeys)) {
              queryClient.setQueryData(queryKeys, properties);
            }

            setCurrentTreeId(id);
            mapboxMap.getCanvas().style.cursor = 'pointer';
          } else {
            setCurrentTreeId(null);
          }
        });

        mapboxMap.on('mousemove', ({ point: { x, y }, lngLat: { lng } }) => {
          if (!selectionEnabledRef.current) {
            return;
          }

          const [feature] = mapboxMap.queryRenderedFeatures([x, y], { layers: layerIDs });

          if (!feature) {
            mapboxMap.getCanvas().style.cursor = '';
            popup.remove();
            currentFeature.current = null;
          } else if (feature.properties.id !== currentFeature.current?.properties?.id
              || !popup.isOpen()) {
            // We have to get the coordinates from the feature's geometry rather than its properties
            // because newly-edited or -added trees don't return the lng/lat in properties, though
            // it is returned in vector tiles.
            const coordinates = [...feature.geometry.coordinates];
            const html = createPopupHTML(feature.properties);

            // Ensure that if the map is zoomed out such that multiple copies of the feature are
            // visible, the popup appears over the copy being pointed to.
            while (Math.abs(lng - coordinates[0]) > 180) {
              coordinates[0] += lng > coordinates[0]
                ? 360
                : -360;
            }

            currentFeature.current = feature;
            mapboxMap.getCanvas().style.cursor = 'pointer';
            popup
              .setLngLat(coordinates)
              .setHTML(html)
              .addTo(mapboxMap);
          }
        });

// TODO: don't let mouse move quickly off a dot and onto the popup.  maybe because moving over popup doesn't trigger mouseleave?
        mapboxMap.on('mouseleave', () => {
          mapboxMap.getCanvas().style.cursor = '';
          popup.remove();
          currentFeature.current = null;
        });
      });

      setMap(mapboxMap);
    }

    // Somewhat mysteriously, returning this noop avoids the React warning about not being able to
    // call setState() in an unmounted component, which can happen when the user logs in and is
    // redirected back to /, and is then redirected to /go#<hash value>, which then redirects back
    // to the map with that hash value.
// TODO: remove this?
    return () => {};
  }, [map, containerRef]);

  if (!isMapboxSupported) {
    return unsupportedError;
  }

  return (
    <>
      <MapboxControlPortal
        map={map}
        position="top-left"
      >
        <NewTree
          map={map}
        />
      </MapboxControlPortal>
      <MapboxControlPortal
        map={map}
        position="top-left"
      >
        <Adopt />
      </MapboxControlPortal>
      <MapboxControlPortal
        map={map}
        position="bottom-right"
      >
        <TreeLayerLegend
          map={map}
          title="Tree layers:"
          layers={layers}
          expanded
        />
      </MapboxControlPortal>
      {isMapLoaded && (
        <MapLayers
          map={map}
          layers={layers}
          currentTreeData={currentTreeData}
        />
      )}
    </>
  );
}
