/* eslint-disable guard-for-in */
import { useAuth0 } from '@auth0/auth0-react';
import mapboxgl from 'mapbox-gl';
import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postData } from '../../api/queries';
import Slideout from '../../components/Slideout/Slideout';
import config from '../../config';
import AddTree from '../addtree/AddTree';
import Countries from '../countries/Countries';
import TreeAdoptionDirections from '../treedata/TreeAdoptionDirections';
import './Mapper.scss';

mapboxgl.accessToken = config.mapbox;

function Mapper() {
  const { isAuthenticated, user } = useAuth0();
  const queryClient = useQueryClient();
  const mutateUser = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
  const mapboxElRef = useRef(null); // DOM element to render map
  const [map, setMap] = useState(null);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [zoom, setZoom] = useState();
  const [newTreeAdded, setNewTreeAdded] = useState();

  useEffect(() => {
    if (isAuthenticated) mutateUser.mutate(['users', user]);

    if (!map && mapboxgl.supported()) {
      const mapboxMap = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
        center: coordinatesNewTree || [-122.34725, 37.7343787],
        zoom: zoom || 10,
      });
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      });

      // Add the geolocate and navigation controls to the map.
      mapboxMap.addControl(geolocate);
      mapboxMap.addControl(new mapboxgl.NavigationControl());
      geolocate.on('geolocate');

      setMap(mapboxMap);
    }
  }, []);

  return (
    <div className="App">
      <div className="map__container">
        <div className="mapBox" ref={mapboxElRef} />
      </div>

      {map
        ? <>
            <Countries
              map={map}
            />

            <Slideout
              buttonText={{ left: 'ADOPT' }}
            >
              <TreeAdoptionDirections onmap />
            </Slideout>

            <AddTree
              map={map}
              setZoom={setZoom}
              coordinatesNewTree={coordinatesNewTree}
              setCoordinatesNewTree={setCoordinatesNewTree}
              newTreeAdded={newTreeAdded}
              setNewTreeAdded={setNewTreeAdded}
            />
          </>
        : <div className="map__error">
            <p>An error occurred while loading the tree map.</p>
            <p>Please make sure your computer and browser support WebGL.</p>
          </div>
      }
    </div>
  );
}

export default Mapper;
