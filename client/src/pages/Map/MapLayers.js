import React, { useEffect } from 'react';
import { useCitiesQuery, useTreemapQuery } from '@/api/queries';
import { treeHealthUtil } from '@/util/treeHealthUtil';
import TreeCountLayer from './TreeCountLayer';
import TreeLayer from './TreeLayer';

// TODO make the dots bigger on zoom out so you can see which cities have trees
const circleRadius = {
  'circle-radius': [
    'interpolate', ['linear'], ['zoom'],
    10, 2,
    11, 3,
    17, 9,
  ],
};
const circleLayerZoomRange = {
  type: 'circle',
  minzoom: 5,
  maxzoom: 18,
};

const circleLayerZoomRangeGeo = {
  type: 'circle',
  minzoom: 5,
  maxzoom: 24,
};

const sourceLayerMapboxVectorTiles = {
  source: 'WTTV',
  'source-layer': 'data',
  ...circleLayerZoomRange,
};

export default function MapLayers({
  map, layers, handlers, currentTreeData,
}) {
  useEffect(() => {
    if (!currentTreeData) return;
    const data = {
      features: [],
      type: 'FeatureCollection',
    };

    const { lng, lat } = currentTreeData;

    data.features.push({
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });
    map.getSource('selection').setData(data);
  }, [currentTreeData]);

  return (
    <>
      <TreeCountLayer
        id="cities"
        useQuery={useCitiesQuery}
        map={map}
        minzoom={2}
        maxzoom={11}
        flyToZoom={12}
      />

      {!map.getLayer('WTTV') && layers.map(({ id }) => (
        <TreeLayer
          key={id}
          id={id}
          map={map}
          on={handlers}
          layer={{
            ...sourceLayerMapboxVectorTiles,
            ...circleLayerZoomRange,
            filter: id === 'noData'
              ? ['!has', 'health']
              : [
                'match',
                ['get', 'health'],
                id, true, false,
              ],
            paint: {
              'circle-color': treeHealthUtil.getColorByName(id, 'fill'),
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
          ...circleLayerZoomRangeGeo,
          paint: {
            // Unlike the other layers above, this one can contain trees with different health
            // values.  So set each circle's paint color by matching the health value to a color.
            'circle-color': [
              'match',
              ['get', 'health'],
              ...treeHealthUtil.getPaintColors('fill'),
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
          ...circleLayerZoomRangeGeo,
          paint: {
            'circle-color': 'transparent',
            ...circleRadius,
            'circle-stroke-color': 'white',
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
