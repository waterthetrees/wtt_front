import { Alert, Box, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { useTreeQuery } from '@/api/queries';
import Adopt from '@/pages/Adopt/Adopt';
import { MapboxManagerContext } from '@/pages/Map/MapboxManagerProvider';
import NewTreeButton from '@/pages/NewTree/NewTreeButton';
import GeolocateControl from '@/pages/UserLocation/GeolocateControl';
import { mapboxAccessToken } from '@/util/config';
import { REGION_TYPES } from '@/util/constants';
import { treeHealthUtil } from '@/util/treeHealthUtil';

import MapLayers from './MapLayers';
import MapboxControlPortal from './MapboxControlPortal';
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
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        An error occurred while loading the tree map.
      </Typography>
      <Typography variant="body1">
        Please make sure your computer and browser support WebGL.
      </Typography>
    </Alert>
  </Box>
);

function createPopupHTML({ common, scientific }) {
  const commonString = common ? `<h4>${common}</h4>` : '';
  const scientificString =
    scientific && scientific !== common ? `<h5>${scientific}</h5>` : '';

  return `<div>${commonString}${scientificString}</div>`;
}

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

// What is this doing here?
const layers = [
  // Reverse the tree health names, so they go from good to vacant.
  ...treeHealthUtil.getNameValuePairs().reverse(),
  ['noData', 'No Data'],
].map(([id, label]) => ({
  id,
  label:
    typeof label === 'string'
      ? label
      : id.replace(/(^\w)/g, (m) => m.toUpperCase()),
  color: treeHealthUtil.getColorByName(id, 'fill'),
}));

// This is not working correctly
// AND I think it may re-adds the layer every time another tree is added?
const layerIDs = [
  ...layers.map(({ id }) => id),
  // Include the editedTrees layer, so that a mouseover on a newly-added or -edited tree will show
  // its popup.
  'editedTrees',
];

export default function Map({
  setCurrentTreeDataVector,
  containerRef,
  currentTreeData,
  currentTreeDb,
  setCurrentTreeId,
  selectionEnabled,
}) {
  const [map, setMap] = useState(null);
  const mapboxManager = useContext(MapboxManagerContext);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const selectionEnabledRef = useRef(selectionEnabled);
  const currentFeature = useRef(null);

  const initialLoadTreeId = useRef(
    new URLSearchParams(window.location.hash.slice(1)).get('id'),
  );
  // This tree query is intentionally separate from the one in `MapLayout`,
  // since it kicks off only once on load!
  const { data: initialLoadTreeData } = useTreeQuery(
    { id: initialLoadTreeId.current },
    { retry: 0, enabled: !!initialLoadTreeId.current },
  );

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
        projection: 'globe',
        style: 'mapbox://styles/waterthetrees/ckyckqkqz8e4b14rn3rm1hh9k',
        center: [-99.08, 41.03],
        zoom: 2,
        maxZoom: 18.5,
        minZoom: 2,
        // Update the browser URL hash with the current zoom and lat/long of the map.
        hash: 'pos',
      });

      // Switch at runtime
      // mapboxMap.setProjection('globe');

      mapboxMap.on('style.load', () => {
        mapboxMap.setFog({
          // color: 'rgb(186, 210, 235)', // Lower atmosphere
          // 'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          color: 'rgb(25, 90, 130)', // Lower atmosphere
          'high-color': 'rgb(36, 98, 130)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
          'space-color': 'rgb(17, 79, 130)', // Background color
          'star-intensity': 1, // Background star brightness (default 0.35 at low zoooms )
        });
      });

      // Add the navigation controls to the map.
      mapboxMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      mapboxMap.on('load', () => {
        // Now that the style has loaded, add the vector tile source, which will be used by the
        // TreeLayer components to generate a layer for each health type.  We have to do this before
        // setting isMapLoaded to true below, as seems to cause an immediate re-render (because it's
        // coming from a handler outside the React context?), which will render MapLayers, which in

        mapboxMap.addSource('WTTV', {
          type: 'vector',
          url: 'mapbox://waterthetrees.open-trees',
        });

        // Wait until the map is loaded to add mouse event handlers so that we don't try to query
        // layers when the mouse moves before they've been added and loaded.
        mapboxMap.on('click', ({ point: { x, y } }) => {
          if (!selectionEnabledRef.current) {
            return;
          }

          const hashParams = new URLSearchParams(window.location.hash.slice(1));
          const [feature] = mapboxMap.queryRenderedFeatures([x, y], {
            layers: layerIDs,
          });

          if (feature) {
            const {
              properties,
              properties: { id },
              geometry,
            } = feature;

            const currentTree = {
              ...currentTreeDb,
              ...properties,
              lng: geometry.coordinates[0],
              lat: geometry.coordinates[1],
            };

            setCurrentTreeDataVector(currentTree);
            setCurrentTreeId(id);
            hashParams.set('id', id);
            mapboxMap.getCanvas().style.cursor = 'pointer';
          } else {
            // This click was on a blank part of the map, so clear the selection.
            setCurrentTreeId(null);
            hashParams.delete('id');
          }

          const newUrl = `${window.location.origin}#${decodeURIComponent(
            hashParams.toString(),
          )}`;
          window.history.replaceState({}, '', newUrl);
        });

        // Unlike the click handler above, we want to get mousemove/leave events only for features
        // on the tree layers, not the entire map, so pass an array of layer IDs.
        mapboxMap.on(
          'mousemove',
          layerIDs,
          ({ features: [feature], lngLat: { lng } }) => {
            if (!selectionEnabledRef.current) {
              return;
            }

            const id = feature?.properties?.id;

            // If the tree circles are big enough, we'll get lots of mousemove events for a single
            // tree, so make sure it's a different one than what the popup is currently showing, to
            // avoid moving and re-adding the popup.
            if (
              id &&
              (feature.properties.id !==
                currentFeature.current?.properties?.id ||
                !popup.isOpen())
            ) {
              const coordinates = [...feature.geometry.coordinates];
              const html = createPopupHTML(feature.properties);

              // Ensure that if the map is zoomed out such that multiple copies of the feature are
              // visible, the popup appears over the copy being pointed to.
              while (Math.abs(lng - coordinates[0]) > 180) {
                coordinates[0] += lng > coordinates[0] ? 360 : -360;
              }

              currentFeature.current = feature;
              mapboxMap.getCanvas().style.cursor = 'pointer';
              popup.setLngLat(coordinates).setHTML(html).addTo(mapboxMap);
            }
          },
        );

        mapboxMap.on('mouseleave', layerIDs, () => {
          mapboxMap.getCanvas().style.cursor = '';
          popup.remove();
          currentFeature.current = null;
        });

        setIsMapLoaded(true);
      });

      // Eventually, we only want to set the mapboxManager's map and not save the mapbox map itself in state
      setMap(mapboxMap);
      mapboxManager.setMap(mapboxMap);
    }
  }, [map, containerRef]);

  useEffect(() => {
    if (initialLoadTreeData) {
      const { lng, lat, id } = initialLoadTreeData;
      mapboxManager.setCenter({
        coords: { lng, lat },
        regionType: REGION_TYPES.LATLONG,
      });
      setCurrentTreeId(id);
    }
  }, [initialLoadTreeData, mapboxManager, setCurrentTreeId]);

  if (!isMapboxSupported) {
    return unsupportedError;
  }

  return (
    isMapLoaded && (
      <>
        <MapLayers
          map={map}
          layers={layers}
          currentTreeData={currentTreeData}
        />
        <MapboxControlPortal map={map} position="bottom-right">
          <NewTreeButton />
        </MapboxControlPortal>
        <MapboxControlPortal map={map} position="bottom-right">
          <TreeLayerLegend
            map={map}
            title="Tree layers:"
            layers={layers}
            expanded
          />
        </MapboxControlPortal>
        <MapboxControlPortal map={map} position="top-right">
          <GeolocateControl />
        </MapboxControlPortal>
        <MapboxControlPortal map={map} position="bottom-right">
          <Adopt />
        </MapboxControlPortal>
      </>
    )
  );
}
