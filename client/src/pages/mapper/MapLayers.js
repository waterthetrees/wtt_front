import React from 'react';
import { tilesServerEndpoints } from '../../api/apiEndpoints';
import { useCitiesQuery, useCountriesQuery, useTreemapQuery } from '../../api/queries';
import TreeCountLayer from './TreeCountLayer';
import TreeLayer from './TreeLayer';

const treeFillColors = [
  'match',
  ['get', 'health'],
  'good', '#309000',
  'fair', '#889944',
  'poor', '#be9b7b',
  'dead', 'white',
  'vacant', 'white',
  'missing', 'white',
  'concrete', '#808080',
  'stump', 'white',
  '#309000',
];
const treeStrokeColors = [
  'match',
  ['get', 'health'],
  'good', '#309000',
  'fair', '#889944',
  'poor', '#be9b7b',
  'dead', 'black',
  'vacant', '#8d5524',
  'missing', '#c68642',
  'concrete', '#808080',
  'stump', '#f1c27d',
  '#309000',
];

export default function MapLayers({ map, setCurrentTreeId, setShowTree }) {
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
            'circle-opacity': 0.8,
            'circle-color': treeFillColors,
            'circle-radius': {
              property: 'dbh',
              base: 1,
              stops: [
                [12, 1],
                [17, 480],
              ],
            },
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
        setShowTree={setShowTree}
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
            'circle-opacity': 0.8,
            'circle-color': treeFillColors,
            'circle-radius': {
              property: 'health',
              base: 1,
              stops: [
                [12, 8],
                [18, 280],
              ],
            },
            'circle-stroke-color': treeStrokeColors,
            'circle-stroke-width': 3,
          },
        }}
        map={map}
        setCurrentTreeId={setCurrentTreeId}
        setShowTree={setShowTree}
      />
    </>
  );
}
