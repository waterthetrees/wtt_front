import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { postData } from '../../api/queries';
import Cities from '../cities/Cities';
import AddTree from '../addtree/AddTree';
import config from '../../config';
import Slideout from '../../components/Slideout/Slideout';
import TreeAdoptionDirections from '../treedata/TreeAdoptionDirections';

mapboxgl.accessToken = config.mapbox;

function Mapper() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth0();

  const mutateUser = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const mapboxElRef = useRef(null); // DOM element to render map
  const [mapContainer, setMap] = useState();

  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [zoomUserSet, setZoom] = useState();
  const [newTreeAdded, setNewTreeAdded] = useState();

  useEffect(() => {
    if (isAuthenticated) mutateUser.mutate(['users', user]);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    });

    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
      center: coordinatesNewTree || [-122.34725, 37.7343787],
      zoom: zoomUserSet || 10,
    });
    // Add the control to the map.
    map.addControl(geolocate);
    geolocate.on('geolocate');
    // Add navigation controls to the top right of the canvas
    map.addControl(new mapboxgl.NavigationControl());
    setMap(map);
  }, []);

  return (
    <div className="App">
      <div className="map__container">
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {mapContainer && (
        <Cities
          map={mapContainer}
        />
      )}

      <Slideout
        buttonText={{ left: 'ADOPT' }}
      >
        <TreeAdoptionDirections onmap />
      </Slideout>

      <AddTree
        map={mapContainer}
        setZoom={setZoom}
        coordinatesNewTree={coordinatesNewTree}
        setCoordinatesNewTree={setCoordinatesNewTree}
        newTreeAdded={newTreeAdded}
        setNewTreeAdded={setNewTreeAdded}
      />

    </div>
  );
}

export default Mapper;
