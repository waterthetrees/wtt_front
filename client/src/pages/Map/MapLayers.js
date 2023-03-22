import React, { useEffect } from 'react';
import { useCitiesQuery, useTreemapQuery } from '@/api/queries';
import { treeHealthUtil } from '@/util/treeHealthUtil';
import CityLayer from './CityLayer';
import ClusterLayer from './ClusterLayer';
import TreeClusterLayer from './TreeClusterLayer';
import TreeLayer from './TreeLayer';

const linearZoom = [
  'interpolate',
  ['linear'],
  ['zoom'],
  5,
  10,
  7,
  7,
  10,
  2,
  18,
  6,
];

const circleRadius = [
    'step',
    ['get', 'point_count'],
    10,
    500,
    20,
    1000,
    30
];

const clusterColor =  [
    'step',
    ['get', 'point_count'],
    '#51bbd6',
    100,
    '#f1f075',
    750,
    '#f28cb1'
];

const clusterLayerZoomRange = {
  minzoom: 2,
  maxzoom: 8,
};

const treeClusterLayerZoomRange = {
  minzoom: 8,
  maxzoom: 12,
}

const circleLayerZoomRange = {
  type: 'circle',
  minzoom: 12,
  //maxzoom: 18.51,
};

export default function MapLayers({ map, layers, handlers, currentTreeData, popup, selectionEnabled }) {
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
      <CityLayer
        id="cities"
        useQuery={useCitiesQuery}
        map={map}
        minzoom={2}
        maxzoom={11}
        flyToZoom={12}
      />

      {!map.getLayer('WTTV') &&
        layers.map(({ id }) => (
          <TreeLayer
            key={id}
            id={id}
            map={map}
            on={handlers}
            layer={{
              source: 'WTTV',
              'source-layer': 'data',
              ...circleLayerZoomRange,
              filter:
                id === 'noData'
                  ? ['!has', 'health']
                  : ['match', ['get', 'health'], id, true, false],
              paint: {
                'circle-color': treeHealthUtil.getColorByName(id, 'fill'),
                'circle-radius': linearZoom,
              },
            }}
          />
        ))}

      <ClusterLayer
        map={map}
        on={handlers}
        popup={popup}
        selectionEnabled={selectionEnabled}
        {...clusterLayerZoomRange}
      />

      <TreeClusterLayer
        map={map}
        on={handlers}
        popup={popup}
        selectionEnabled={selectionEnabled}
        {...treeClusterLayerZoomRange}
      />

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
              ...treeHealthUtil.getPaintColors('fill'),
            ],
            'circle-radius': linearZoom,
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
            'circle-radius': linearZoom,
            'circle-stroke-color': 'white',
            'circle-stroke-width': linearZoom,
          },
        }}
      />
    </>
  );
}
