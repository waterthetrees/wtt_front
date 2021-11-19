import { useEffect } from 'react';

export default function TreeCountLayer({
  name, useQuery, map, minzoom, maxzoom, flyToZoom,
}) {
  const { data } = useQuery();
  const imageName = `image-${name}`;

  useEffect(() => {
    if (!map || !data || map.hasImage(imageName)) return;

    map.loadImage(
      'assets/images/map/mapface.png',
      (error, image) => {
        if (error) throw error;

        map.addImage(imageName, image);

        map.addLayer({
          id: name,
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

    map.on('click', name, ({ features: [feature], lngLat: lng }) => {
      const coordinates = feature.geometry.coordinates.slice();
      const featureName = feature.properties.name;

      while (Math.abs(lng - coordinates[0]) > 180) {
        coordinates[0] += lng > coordinates[0] ? 360 : -360;
      }

      map.setCenter(coordinates);
      map.flyTo({
        center: coordinates,
        zoom: [flyToZoom],
      });
      map.setFeatureState({
        source: name,
        id: featureName,
      }, {
        hover: true,
      });
    });

    map.on('mouseenter', name, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', name, () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map, data]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
