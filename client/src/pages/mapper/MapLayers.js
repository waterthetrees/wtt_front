import React from 'react';
import { useCitiesQuery, useCountriesQuery, useTreemapQuery } from '../../api/queries';
import TreeCountLayer from './TreeCountLayer';
import TreeLayer from './TreeLayer';
import { treeHealth } from '../../util/treeHealth';

const circleRadius = {
  'circle-radius': [
    'interpolate', ['linear'], ['zoom'],
    12, 1,
    18, 6,
  ],
};
const circleLayerZoomRange = {
  type: 'circle',
  minzoom: 11,
  maxzoom: 22,
};
const circleVectorLayer = {
  'source-layer': 'public.treedata',
  source: 'public.treedata',
  ...circleLayerZoomRange,
};

// The noData TreeLayer needs to be created first, so that when the legend reverses the order, it
// appears at the bottom of the list.
export default function MapLayers({ map, setCurrentTreeId }) {
  return (
    <>
      <TreeCountLayer
        name="countries"
        useQuery={useCountriesQuery}
        map={map}
        minzoom={2}
        maxzoom={8.75}
        flyToZoom={10}
      />

      <TreeCountLayer
        name="cities"
        useQuery={useCitiesQuery}
        map={map}
        minzoom={9}
        maxzoom={11}
        flyToZoom={12}
      />

      <TreeLayer
        key="noData"
        name="noData"
        layer={{
          filter: ['!has', 'health'],
          ...circleVectorLayer,
          paint: {
            'circle-color': treeHealth.getColorByName('default', 'fill'),
            ...circleRadius,
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
      />

      {treeHealth.getNameValuePairs().map(([name]) => (
        <TreeLayer
          key={name}
          name={name}
          layer={{
            filter: [
              'match',
              ['get', 'health'],
              `${name}`, true, false,
            ],
            ...circleVectorLayer,
            paint: {
              'circle-color': treeHealth.getColorByName(name, 'fill'),
              ...circleRadius,
            },
          }}
          map={map}
          setCurrentTreeId={setCurrentTreeId}
        />
      ))}

      <TreeLayer
        name="treedata"
        useQuery={useTreemapQuery}
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
            'circle-color': [
              'match',
              ['get', 'health'],
              ...treeHealth.getPaintColors('fill')
            ],
            ...circleRadius,
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
      />
    </>
  );
}
