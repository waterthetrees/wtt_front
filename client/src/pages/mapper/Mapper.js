/* eslint-disable guard-for-in */
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { PlayCircleFilledWhite } from '@material-ui/icons';
import { getData, postData } from '../../api/queries';
import City from '../city/City';
import TreeData from '../treedata/TreeData';
import AddTree from '../addtree/AddTree';
// import UserProfile from '../userprofile';
import config from '../../config';
// import getCityCenters from './cities';

mapboxgl.accessToken = config.mapbox.key;
const CITYIMAGE = 'assets/images/map/city.png';

function getFeatures(cityData) {
  const cities = cityData.map((city) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [city.lng, city.lat],
    },
    properties: {
      'image-name': 'city',
      name: city.city,
    },
  }));
  // console.log('cities', cities);
  return cities;
}

function Mapper() {
  const componentName = 'Mapper';

  const { isAuthenticated, user } = useAuth0();
  const [mutateUser] = useMutation(postData, {
    onSuccess: () => {
      queryCache.invalidateQueries('user');
    },
  });
  const [cityClicked, setCityClicked] = useState(null);
  // getData from DB

  const citymap = useQuery(['treemap', { city: 'All' }], getData);

  // console.log('cityClicked', cityClicked);
  // const cities = getCityCenters(treemapcities);

  const { data, error } = citymap || {};
  const cityData = data || null;

  const mapboxElRef = useRef(null); // DOM element to render map
  console.log('\n\nmapboxElRef.current', mapboxElRef.current);
  const [mapHolder, setMapHolder] = useState(null);
  console.log('\n\nmapHolder', mapHolder);
  // const [zoom, setZoom] = useState(15);

  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [zoomUserSet, setZoom] = useState(null);
  // -------------------------
  // Add search
  // -------------------------
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // console.log('window.innerWidth', window.innerWidth);
  const zoomWindowWidth = (window.innerWidth >= 768) ? 11 : 9;
  // Initialize our map
  useEffect(() => {
    if (isAuthenticated) mutateUser(['user', user]);
    if (!cityData) return;

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      style: 'mapbox://styles/100ktrees/ckffjjvs41b3019ldl5tz9sps',
      center: coordinatesNewTree || currentCenter || [-122.3366087, 37.8121351],
      zoom: zoomUserSet || zoomWindowWidth,
    });

    console.log(componentName, 'in UseEffect map', map);

    // Add the control to the map.
    map.addControl(geolocate);
    // geolocate.on('geolocate', (e) => {
    // console.log('e', e);
    // });
    // Add navigation controls to the top right of the canvas
    map.addControl(new mapboxgl.NavigationControl());

    map.once('load', () => {
      // Add our layer
      if (cityData) {
        // const coordinates = [cityData[0].lat, cityData[0].lng];

        const images = {
          popup: 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png',
          'popup-debug':
          'https://docs.mapbox.com/mapbox-gl-js/assets/popup_debug.png',
        };

        const cities = getFeatures(cityData);
        map.loadImage(
          CITYIMAGE,
          // 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png',
          // 'https://upload.wikimedia.org/wikipedia/commons/b/bd/TreeSize-Icon-256.png',
          (error, image) => {
            // console.log('image', image);
            if (error) throw error;
            map.addImage('cityImage', image);
            map.addSource('cityFeatures', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: cities,
              },
            });
            map.addLayer({
              id: 'cities',
              type: 'symbol',
              source: 'cityFeatures',
              layout: {
                'icon-image': 'cityImage',
                'text-field': ['get', 'name'],
                'icon-text-fit': 'none',
                'icon-allow-overlap': true,
                'text-allow-overlap': false,
              },
              paint: {
                'text-color': 'white',
              },
            });
          },
          {
            // The two (blue) columns of pixels that can be stretched horizontally:
            //   - the pixels between x: 25 and x: 55 can be stretched
            //   - the pixels between x: 85 and x: 115 can be stretched.
            stretchX: [
              // [25, 55],
              // [85, 115],
              // [45, 55],
              // [25, 115],
              [10, 25],
              [25, 55],
            ],
            // The one (red) row of pixels that can be stretched vertically:
            //   - the pixels between y: 25 and y: 100 can be stretched
            // stretchY: [[25, 100]],
            stretchY: [[25, 55]],
            // stretchY: [[45, 55]],
            // This part of the image that can contain text ([x1, y1, x2, y2]):
            content: [25, 25, 115, 100],
            // This is a high-dpi image:
            pixelRatio: 2,
          },
        );

        // inspect a cluster on click
        map.on('click', 'cities', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const cityCurrent = e.features[0].properties.name;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          // console.log('clicked city', cityCurrent, coordinates);

          setCityClicked(cityCurrent);
          setCurrentCenter(coordinates);
          setZoom(12);
          map.easeTo({
            center: coordinates,
            zoom: [12],
          });
        });

        map.on('mouseenter', 'cities', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'cities', () => {
          map.getCanvas().style.cursor = '';
        });

        // map.on('click', 'treedata', (e) => {
        //   map.getCanvas().style.cursor = 'pointer';
        //   setCurrentTreeId(e.features[0].properties.id);
        //   setShowTree(true);
        // });

        // const hoveredStateId = null;

        // const popup = new mapboxgl.Popup({
        //   closeButton: false,
        //   closeOnClick: false,
        // });
      }

      setMapHolder(map);
    });
    // return () => {};
  }, [cityData]);
  // console.log('mapHolder', mapHolder, 'mapboxElRef', mapboxElRef);
  // USER PROFILE
  // --------------------------
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!userProfileOpen);
  if (error) return (<div>Failed to load trees</div>);
  return (
    <div className="App">
      <div className="map__container">
        {/* Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {cityClicked && mapHolder && (
        <City
          cityClicked={cityClicked}
          map={mapHolder}
          zoom={zoomUserSet}
          currentCenter={currentCenter}
        />
      )}
      {userProfileOpen && (
        <UserProfile toggle={toggle} modal={userProfileOpen} />
      )}
      {cityData && mapboxElRef && (
        <div className="addtreepage">
          <AddTree
            map={mapboxElRef.current}
            setZoom={setZoom}
            coordinatesNewTree={coordinatesNewTree}
            setCoordinatesNewTree={setCoordinatesNewTree}
          />
        </div>
      )}
    </div>
  );
}

export default Mapper;
