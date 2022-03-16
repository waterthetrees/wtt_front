import { useEffect } from 'react';

export default function TreeCountLayer({
  id, useQuery, map, minzoom, maxzoom, flyToZoom,
}) {
  const { data } = useQuery();
  const imageName = `image-${id}`;

  useEffect(() => {
    if (!map || !data || map.hasImage(imageName)) return;

    map.loadImage(
      'assets/images/map/mapface.png',
      (error, image) => {
        if (error) throw error;

        map.addImage(imageName, image);

        map.addLayer({
          id,
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: data,
            },
          },
          minzoom,
          maxzoom,
          layout: {
            'icon-image': imageName,
            'icon-size': 0.05,
            'icon-text-fit': 'none',
            'icon-allow-overlap': true,
            'text-allow-overlap': false,
            'text-transform': 'uppercase',
            'text-field': [
              'format',
              ['get', 'name'],
              {
                'font-scale': 1.5,

                'text-font': [
                  'literal',
                  ['Roboto Black', 'Open Sans Bold', 'Arial Unicode MS Bold'],
                ],
              },
              // '\n',
              // {},
              // ['get', 'count'],
              // {
              //   'font-scale': 0.8,
              //   'text-font': [
              //     'literal',
              //     ['Roboto Black', 'Arial Unicode MS Bold'],
              //   ],
              // },
            ],
          },
          paint: {
            'text-color': '#000000',
            'text-halo-color': '#fff',
            'text-halo-width': 2,
          },
        });
      },
    );

    map.on('click', id, ({ features: [feature], lngLat: lng }) => {
      const coordinates = feature.geometry.coordinates.slice();

      while (Math.abs(lng - coordinates[0]) > 180) {
        coordinates[0] += lng > coordinates[0] ? 360 : -360;
      }

      map.flyTo({
        center: coordinates,
        zoom: [flyToZoom],
      });
    });

    map.on('mouseenter', id, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', id, () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map, data]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
