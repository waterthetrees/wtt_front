import React, { useEffect } from 'react';
import { useCitiesQuery, useCountriesQuery, useTreemapQuery } from '@/api/queries';
import { treeHealth } from '@/util/treeHealth';
import TreeCountLayer from './TreeCountLayer';
import TreeLayer from './TreeLayer';

const circleRadius = {
  'circle-radius': [
    'interpolate', ['linear'], ['zoom'],
    12, 1,
    24, 16,
  ],
};
const circleLayerZoomRange = {
  type: 'circle',
  minzoom: 11,
  maxzoom: 24,
};
const sourceLayer = {
  'source-layer': 'public.treedata',
  source: 'public.treedata',
};

export default function MapLayers({
  map, layers, handlers, currentTreeData,
}) {
  useEffect(() => {
    const data = {
      features: [],
      type: 'FeatureCollection',
    };

    if (currentTreeData) {
      const { lng, lat } = currentTreeData;

      data.features.push({
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      });
    }

    map.getSource('selection').setData(data);
  }, [currentTreeData]);

  return (
    <>
      <TreeCountLayer
        id="countries"
        useQuery={useCountriesQuery}
        map={map}
        minzoom={2}
        maxzoom={9}
        flyToZoom={10}
      />

      <TreeCountLayer
        id="cities"
        useQuery={useCitiesQuery}
        map={map}
        minzoom={9}
        maxzoom={11}
        flyToZoom={12}
      />

      {layers.map(({ id }) => (
        <TreeLayer
          key={id}
          id={id}
          map={map}
          on={handlers}
          layer={{
            ...sourceLayer,
            ...circleLayerZoomRange,
            filter: id === 'noData'
              ? ['!has', 'health']
              : [
                'match',
                ['get', 'health'],
                id, true, false,
              ],
            paint: {
              'circle-color': treeHealth.getColorByName(id, 'fill'),
              ...circleRadius,
            },
          }}
        />
      ))}

      <TreeLayer
        id="editedTrees"
        map={map}
        useQuery={useTreemapQuery}
        layer={{
          // The data for this layer will be set to the features returned by useTreemapQuery().  So
          // initialize the layer with an empty features array.
          source: {
            type: 'geojson',
            data: {
              features: [],
              type: 'FeatureCollection',
            },
          },
          ...circleLayerZoomRange,
          paint: {
            // Unlike the other layers above, this one can contain trees with different health
            // values.  So set each circle's paint color by matching the health value to a color.
            'circle-color': [
              'match',
              ['get', 'health'],
              ...treeHealth.getPaintColors('fill'),
            ],
            ...circleRadius,
          },
        }}
      />

      <TreeLayer
        id="selection"
        map={map}
        layer={{
          source: {
            type: 'geojson',
            data: {
              features: [],
              type: 'FeatureCollection',
            },
          },
          ...circleLayerZoomRange,
          paint: {
            'circle-color': 'transparent',
            ...circleRadius,
            'circle-stroke-color': 'yellow',
            'circle-stroke-width': [
              'interpolate', ['linear'], ['zoom'],
              12, 2,
              24, 12,
            ],
          },
        }}
      />
    </>
  );
}
