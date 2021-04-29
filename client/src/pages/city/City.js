import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import TreeData from '../treedata/TreeData';
import config from '../../config';
// eslint-disable-next-line no-unused-vars
import makeLayerTile from './makeLayerTile';
import makeLayerGeo from './makeLayerGeo';

mapboxgl.accessToken = config.mapbox.key;

function City(props) {
  // const componentName = 'City';
  const {
    map,
    cityName,
    newTreeAdded,
  } = Object(props);
  
  const treemap = useQuery(['treemap', { city: cityName }], getData);
  const mapData = treemap.data || null;
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [showTree, setShowTree] = useState(false);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    makeLayerTile(map, setCurrentTreeId, setShowTree);
  }, [map, health, newTreeAdded]);

  useEffect(() => {
    makeLayerGeo(map, setCurrentTreeId, setShowTree,
      'treedata', cityName, mapData);
  }, [mapData, newTreeAdded]);
  
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
