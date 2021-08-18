import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import TreeData from '../treedata/TreeData';
import config from '../../config';
// eslint-disable-next-line no-unused-vars
import makeLayerTile from './makeLayerTile';
import makeLayerGeo from './makeLayerGeo';
import makeFunctionLayer from './makeFunctionTile';

mapboxgl.accessToken = config.mapbox.key;

function City(props) {
  // const componentName = 'City';
  const {
    map,
    cityName,
    newTreeAdded,
    filter,
    filterCityName,
  } = Object(props);

  const treemap = useQuery(['treemap', { city: cityName }], getData);
  const mapData = treemap.data || null;
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [showTree, setShowTree] = useState(false);
  const [health, setHealth] = useState(null);

  // useEffect(() => {
  //   makeLayerTile(map, setCurrentTreeId, setShowTree);
  // }, [map, health, newTreeAdded]);

  // useEffect(() => {
  //   makeLayerGeo(map, setCurrentTreeId, setShowTree,
  //     'treedata', cityName, mapData);
  // }, [mapData, newTreeAdded]);

  // useEffect(() => {
  //   makeFunctionLayer(map, setCurrentTreeId, setShowTree,
  //     'treedata', cityName, mapData, filterCityName);
  // }, [mapData, newTreeAdded, filterCityName]);

  useEffect(() => {
    makeFunctionLayer(map, setCurrentTreeId, setShowTree,
      'treedata', cityName, mapData, cityName, filter);
  }, [map, health, newTreeAdded, filter]);

  return (
    <div className="TreeData">
      {currentTreeId && (
        <TreeData
          map={map}
          currentTreeId={currentTreeId}
          showTree={showTree}
          setShowTree={setShowTree}
          health={health}
          setHealth={setHealth}
        />
      )}
    </div>
  );
}

export default City;
