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

mapboxgl.accessToken = config.mapbox;

function Mapper() {
  // const componentName = 'Mapper';
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth0();

  // getData from DB
  // const treemap = (!featureFlag.vector)
  //   ? useQuery(['treemap', { city: 'All' }], getData)
  //   : null;
  // const error = treemap.error || null;
  // const mapData = (!featureFlag.vector) ? treemap.data : null;

  const mutateUser = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const mapboxElRef = useRef(null); // DOM element to render map
  const [mapContainer, setMap] = useState();
  // const [zoom, setZoom] = useState(15);

  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [zoomUserSet, setZoom] = useState();
  const [newTreeAdded, setNewTreeAdded] = useState();
  // -------------------------
  // Add search
  // -------------------------
  // const windowWidth = window.innerWidth;
  // Initialize our map
  // let map;
  useEffect(() => {
    if (isAuthenticated) mutateUser.mutate(['user', user]);

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

  // USER PROFILE
  // --------------------------
  // const [userProfileOpen, setUserProfileOpen] = useState(false);
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!userProfileOpen);
  // if (error) return (<div>Failed to load trees</div>);
  return (
    <div className="App">
      <div className="map__container">
        {/* Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {mapContainer && (
        <Countries
          map={mapContainer}
        />
      )}
      {/* userProfileOpen && (
        <UserProfile toggle={toggle} modal={userProfileOpen} />
      ) */}

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
