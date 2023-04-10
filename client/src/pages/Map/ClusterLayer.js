import { useEffect } from 'react';

const circleRadius = [
    'step',
    ['case', ['has', 'cluster'], ['get', 'point_count_combined'], ['get', 'point_count']],
    10,
    500,
    20,
    1000,
    30,
    10000,
    40,
    100000,
    50,
];


const clusterColor =  [
    'step',
    ['case', ['has', 'cluster'], ['get', 'point_count_combined'], ['get', 'point_count']],
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


function createPopupHTML({ idName, cluster, point_count, point_count_combined, city, point_count_abbreviated }) {
  if (cluster == true) {
    return `<div>${point_count} cities: ${point_count_combined} points</div>`;
  }
  return `<div>${city || idName}: ${point_count_abbreviated}</div>`;
}

export default function ClusterLayer({
  map,
  minzoom,
  maxzoom,
  popup,
  selectionEnabled,
  flyToZoom,
}) {

  const id = 'clusters';

  useEffect(() => {
    if (!map) return;

    map.addLayer({
      id,
      source: 'WTTV-Cities',
      //source: 'WTTV',
      type: 'circle',
      //'source-layer': 'data',
      maxzoom: maxzoom,
      minzoom: minzoom,
      paint: {
        'circle-color': clusterColor,
        'circle-radius': circleRadius,
      },
      layout: {
        'circle-sort-key': ['-',
          ['case', ['has', 'cluster'], ['get', 'point_count_combined'], ['get', 'point_count']]
        ],
      }
    });

    map.addLayer({
      id: `${id}-text`,
      source: 'WTTV-Cities',
      //source: 'WTTV',
      type: 'symbol',
      //'source-layer': 'data',
      //filter: ['has', 'point_count_abbreviated'],
      minzoom,
      maxzoom,
      layout: {
        'symbol-sort-key': ['-',
          ['case', ['has', 'cluster'], ['get', 'point_count_combined'], ['get', 'point_count']]
        ],
        'symbol-z-order': 'source',
        'text-allow-overlap': false,
        'text-optional': true,
        'text-transform': 'uppercase',
        'text-field': [
          'format',
          //['get', 'point_count_abbreviated'],
          ['case', ['has', 'cluster'], ['get', 'point_count_combined'], ['get', 'point_count']],
          {
            'font-scale': 0.8,
            'text-font': [
              'literal',
              ['Roboto Black', 'Open Sans Bold', 'Arial Unicode MS Bold'],
            ],
          },
        ],
      }
    });


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

    map.on('mouseenter', id, ({ features: [feature], lngLat }) => {
      console.log('mouseenter')
      map.getCanvas().style.cursor = 'pointer';
      if (!popup.isOpen()) {
        const { lat, lng } = lngLat;
        const coordinates = [lng, lat];
        const html = createPopupHTML(feature.properties);

        while (Math.abs(lng - coordinates[0]) > 180) {
          coordinates[0] += lng > coordinates[0] ? 360 : -360;
        }

        // Ensure that if the map is zoomed out such that multiple copies of the feature are
        // visible, the popup appears over the copy being pointed to.
        popup.setLngLat(coordinates).setHTML(html).addTo(map);
      }
    });

    map.on('mouseleave', id, () => {
      console.log('mouseleave')
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }, [map]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
