/* eslint-disable no-param-reassign */
import mapboxgl from 'mapbox-gl';
import mouseMoveMap from './mapboxUtilities';

export default function makeLayerGeo(
  map,
  setCurrentTreeId, setShowTree,
  sourceId, layerId, mapData,
) {
  if (!map.getSource(sourceId) && mapData) {
    // console.log('mapData', mapData);
    map.addSource(sourceId, {
      type: 'geojson',
      data: mapData,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });
  }

  if (mapData && map.getLayer(sourceId)) {
    map.getSource(sourceId).setData(mapData);
  }

  if (mapData && !map.getLayer(sourceId)) {
  // Add our layer
    map.addLayer({
      id: sourceId,
      source: sourceId, // this should be the id of source
      type: 'circle',
      minzoom: 11,
      maxzoom: 22,
      // filter: ['!', ['has', 'point_count']],
      paint: {
      // 'circle-radius': 1,
        'circle-opacity': 0.8,
        'circle-color': [
          'match',
          ['get', 'health'],
          'good', '#309000',
          'fair', '#889944',
          'poor', '#be9b7b',
          'dead', 'white',
          'vacant', 'white',
          'missing', 'white',
          'concrete', '#808080',
          'stump', 'white',
          '#309000',
        ],
        'circle-radius': {
          property: 'health',
          base: 1,
          stops: [
            [12, 8],
            [18, 280],
          ],
        },
        // 'circle-stroke-color': '#000',
        'circle-stroke-color': [
          'match',
          ['get', 'health'],
          'good', '#309000',
          'fair', '#889944',
          'poor', '#be9b7b',
          'dead', 'black',
          'vacant', '#8d5524',
          'missing', '#c68642',
          'concrete', '#808080',
          'stump', '#f1c27d',
          /* other */ '#309000',
        ],
        'circle-stroke-width': 3,

      },
    });
  }

  map.on('click', sourceId, (e) => {
    map.getCanvas().style.cursor = 'pointer';
    setCurrentTreeId(e.features[0].properties.id);
    setShowTree(true);
  });

  let hoveredStateId = null;
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  mouseMoveMap(map, sourceId, hoveredStateId, popup);

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', sourceId, () => {
    if (hoveredStateId) {
      map.setFeatureState(
        {
          source: sourceId,
          id: hoveredStateId,
        },
        { hover: false },
      );
    }
    hoveredStateId = null;
    // lastId = undefined;
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}
