/* eslint-disable guard-for-in */
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getData, postData } from '../../api/queries';
import Cities from '../cities/Cities';
import AddTree from '../addtree/AddTree';
import config from '../../config';

mapboxgl.accessToken = config.mapbox.key;

function Mapper() {
  const componentName = 'Mapper';

  const { isAuthenticated, user } = useAuth0();

  const cities = useQuery(['cities', { city: 'All', fetchPolicy: 'cache-first' }], getData);
  const { data, error } = cities || {};
  const citiesData = data || null;
  console.log('citiesData', citiesData);

  const [mutateUser] = useMutation(postData, {
    onSuccess: () => {
      queryCache.invalidateQueries('user');
    },
  });
  // getData from DB
  // -------------------------
  // Add search
  // -------------------------
  const mapboxElRef = useRef(null); // DOM element to render map
  const [mapHolder, setMapHolder] = useState(null);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);

  const zoomWindowWidth = (window.innerWidth >= 768) ? 13 : 11;
  // Initialize our map
  // let map;
  useEffect(() => {
    if (isAuthenticated) mutateUser(['user', user]);
    // if (!cityData) return;
    if (mapHolder) return;
    if (!mapHolder) {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps?optimize=true',
        // center: coordinatesNewTree || currentCenter || [-122.3366087, 37.8121351],
        // zoom: zoomUserSet || zoomWindowWidth,
        center: [-122.2639432, 37.8040353],
        zoom: zoomWindowWidth,
      });
      // Add the control to the map.
      map.addControl(geolocate);
      map.addControl(new mapboxgl.NavigationControl());
      setMapHolder(map);
      // return () => map.remove();
    }
    //
  }, [mapHolder]);
  // USER PROFILE
  // --------------------------
  // const [userProfileOpen, setUserProfileOpen] = useState(false);
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!userProfileOpen);
  if (error) return (<div>Failed to load trees</div>);
  const citiesList = [];
  return (
    <div className="App">
      <div className="map__container">
        {/* Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {mapHolder && citiesData && (
        <Cities
          map={mapHolder}
          citiesData={citiesData}
          citiesList={citiesList}
        />
      )}
      {/* userProfileOpen && (
        <UserProfile toggle={toggle} modal={userProfileOpen} />
      ) */}
      {mapHolder && (
        <div className="addtreepage">
          <AddTree
            map={mapHolder}
            coordinatesNewTree={coordinatesNewTree}
            setCoordinatesNewTree={setCoordinatesNewTree}
          />
        </div>
      )}
    </div>
  );
}

export default Mapper;
