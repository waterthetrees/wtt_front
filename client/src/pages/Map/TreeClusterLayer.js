import { useEffect } from 'react';

const circleRadius = [
    'step',
    ['get', 'point_count'],
    10,
    500,
    20,
    1000,
    30,
    10000,
    40,
    100000,
    55,
];

const clusterColor =  [
    'step',
    ['get', 'point_count'],
    '#b7cece',
    100,
    '#a7d3a9',
    750,
    '#f5d5cb',
    1000,
    '#ece5ce',
    10000,
    '#b5d1cc',
    100000,
    '#d1e2c8',
];


export default function TreeClusterLayer({
  map,
  minzoom,
  maxzoom,
  flyToZoom,
}) {
  useEffect(() => {
    const id = 'tree-cluster';
    if (!map) return;

    map.addLayer({
      id,
      source: 'WTTV',
      type: 'circle',
      'source-layer': 'data',
      maxzoom: maxzoom,
      minzoom: minzoom,
      paint: {
        'circle-color': clusterColor,
        'circle-radius': circleRadius,
        'circle-opacity': 0.8,
      },
      layout: {
        'circle-sort-key': ['-', ['get', 'point_count']]
      }
    });

    map.addLayer({
      id: `${id}-text`,
      source: 'WTTV',
      type: 'symbol',
      'source-layer': 'data',
      filter: ['has', 'point_count_abbreviated'],
      minzoom,
      maxzoom,
      layout: {
        'symbol-sort-key': ['+', ['get', 'point_count']],
        'symbol-z-order': 'source',
        'text-allow-overlap': false,
        'text-transform': 'uppercase',
        'text-field': [
          'format',
          ['get', 'point_count_abbreviated'],
          {
            'font-scale': 1,
            'text-font': [
              'literal',
              ['Roboto Black', 'Open Sans Bold', 'Arial Unicode MS Bold'],
            ],
          },
        ],
      }
    });

    //map.on('click', 'clusters', ({ features: [feature], lngLat: lng }) => {
    map.on('click', 'clusters', (e) => {
      console.log(e);

      /*
      const coordinates = feature.geometry.coordinates.slice();

      while (Math.abs(lng - coordinates[0]) > 180) {
        coordinates[0] += lng > coordinates[0] ? 360 : -360;
      }

      map.flyTo({
        center: coordinates,
        zoom: [flyToZoom],
      });
      */
    });

    map.on('mouseenter', 'clusters', (e) => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
