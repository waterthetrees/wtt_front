/* eslint-disable guard-for-in */
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

// import { PlayCircleFilledWhite } from '@material-ui/icons';
import { getData, postData } from '../../api/queries';
import Cities from '../cities/Cities';
// import TreeData from '../treedata/TreeData';
import AddTree from '../addtree/AddTree';
// import UserProfile from '../userprofile';
import config from '../../config';
// import getCityCenters from './cities';

mapboxgl.accessToken = config.mapbox.key;
const CITYIMAGE = 'assets/images/map/mapface.png';

// function getFeatures(cityData) {
//   const cities = cityData.map((city) => ({
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [city.lng, city.lat],
//     },
//     properties: {
//       'image-name': 'city',
//       name: city.city,
//     },
//   }));
//   // console.log('cities', cities);
//   return cities;
// }

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
        style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
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
  // console.log('mapHolder', mapHolder, 'mapboxElRef', mapboxElRef);
  // USER PROFILE
  // --------------------------
  // const [userProfileOpen, setUserProfileOpen] = useState(false);
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!userProfileOpen);
  // if (error) return (<div>Failed to load trees</div>);
  // const [citiesShowing, setCitiesShowing] = useState([]);
  const citiesList = [];
  return (
    <div className="App">
      <div className="map__container">
        {/* Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {mapHolder && (
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
