import React from 'react';
import { tilesServerEndpoints } from '../../api/apiEndpoints';
import { useCitiesQuery, useCountriesQuery, useTreemapQuery } from '../../api/queries';
import TreeCountLayer from './TreeCountLayer';
import TreeLayer from './TreeLayer';
import { treeHealth } from '../../util/treeHealth';

const colorMatch = [
  'match',
  ['get', 'health'],
];
const treeFillColors = colorMatch.concat(treeHealth.getPaintColors('fill'));
const treeStrokeColors = colorMatch.concat(treeHealth.getPaintColors('stroke'));
const circlePaint = {
  'circle-opacity': 0.8,
  'circle-color': treeFillColors,
  'circle-radius': {
    base: 0.75,
    stops: [
      [12, 1],
      [18, 6],
    ],
  },
};

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
        name="public.treedata"
        layer={{
          'source-layer': 'public.treedata',
          source: {
            type: 'vector',
            tiles: [`${tilesServerEndpoints}/public.treedata/{z}/{x}/{y}.pbf`],
          },
          type: 'circle',
          minzoom: 11,
          maxzoom: 22,
          paint: {
            ...circlePaint,
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
      />

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
          type: 'circle',
          minzoom: 11,
          maxzoom: 22,
          paint: {
            ...circlePaint,
            'circle-stroke-color': treeStrokeColors,
            'circle-stroke-width': 3,
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
      />
    </>
  );
}
