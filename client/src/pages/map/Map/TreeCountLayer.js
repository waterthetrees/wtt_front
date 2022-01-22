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
            'icon-size': 0.5,
            'icon-text-fit': 'none',
            'icon-allow-overlap': true,
            'text-allow-overlap': false,
            'text-field': [
              'format',
              ['get', 'name'],
              { 'font-scale': 1.5 },
              '\n',
              {},
              ['get', 'count'],
              {
                'font-scale': 0.8,
                'text-font': [
                  'literal',
                  ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
                ],
              },
            ],
          },
          paint: {
            'text-color': '#000000',
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
