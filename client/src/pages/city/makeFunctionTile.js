/* eslint-disable no-param-reassign */
import mapboxgl from 'mapbox-gl';
import { tilesServerEndpoints } from '../../api/apiEndpoints';
import mouseMoveMap from './mapboxUtilities';

function setHoverState(hoveredStateId, hover, sourceLayer) {
  return {
    id: hoveredStateId,
    source: 'public.treedata',
    'source-layer': sourceLayer,
    hover,
  };
}

export default function makeFunctionLayer(map, setCurrentTreeId, setShowTree,
  layerName, cityName, mapData, cityNameFiltered) {
  const URLTILES = `${tilesServerEndpoints}/public.treedata/{z}/{x}/{y}.pbf`;
  // console.log('URLTILES', URLTILES);
  map.addLayer({
    id: 'public.treedata',
    type: 'circle',
    'source-layer': 'public.treedata',
    source: {
      'source-layer': 'public.treedata',
      type: 'vector',
      // url: 'http://localhost:3001/public.treedata.json',
      tiles: [URLTILES],
      // Functions
      // tiles: [
      //   'http://localhost:3001/rpc/public.get_treedata/{z}/{x}/{y}.pbf',
      // ],
    },

    minzoom: 11,
    maxzoom: 22,
    filter: ['==', 'city', cityName],
    paint: {
      // 'circle-color':'#309000',
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
        property: 'dbh',
        base: 1,
        stops: [
          [12, 1],
          [17, 480],
        ],
      },
    },
  });

  map.on('click', 'public.treedata', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    setCurrentTreeId(e.features[0].properties.id_tree);
    setShowTree(true);
  });

  let hoveredStateId = null;
  // if (windowWidth > 768) {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });
  mouseMoveMap(map, 'public.treedata', hoveredStateId, popup);

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', 'public.treedata', () => {
    if (hoveredStateId) {
      const hoverState = setHoverState(hoveredStateId, false, hoveredStateId);
      map.setFeatureState(hoverState);
    }
    hoveredStateId = null;
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}
