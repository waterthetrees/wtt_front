import React, { useState, useRef, useEffect } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';

// ES6
// import ReactMapboxGl, { Layer, Feature, Popup, Cluster, GeoJSONLayer } from 'react-mapbox-gl';
import moment from 'moment';

import { Button, ButtonToggle,Modal, ModalHeader, ModalBody, ModalFooter, Progress, ButtonGroup, Label, Input } from 'reactstrap';
import { TreeData } from './TreeData.js';
// import { TreeAdd } from '../treemap/TreeAdd.js';
// import UserProfile from '../userprofile';
import config from '../../config.js';


const has = Object.prototype.hasOwnProperty;
const today = moment().format('YYYY-MM-DD');



mapboxgl.accessToken = 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w';

// const fetcher = (url) =>
//   fetch(url)
//   .then((r) => r.text())
//   .then((body_string) => JSON.parse(body_string))
//   .then((body) => body.data);


function Mapper() {
  const componentName = 'Mapper';

  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [currentTree, setCurrentTree] = useState({});
  const [showTree, setShowTree] = useState(false);
  const { data: mapData, error } = useSWR('http://localhost:3002/treemap?requestType=GetMap&city=Oakland');
  // const { data: tree } = useSWR(`http://localhost:3002/tree?requestType=GetTree&currentTreeId=${currentTreeId}&lng=${lng}&lat=${lat}`, fetcher);
  
  const mapboxElRef = useRef(null); // DOM element to render map

  // Initialize our map
  useEffect(() => {
    if (!mapData) return ;
    // console.log('mapData here' ,mapData)
    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      // style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-122.196532, 37.779369],
      zoom: 15
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Add navigation controls to the top right of the canvas
    map.addControl(new mapboxgl.NavigationControl());

    map.once('load', function () {
      // Add our SOURCE
      // console.log(mapData,'asdfasdfasdf\n\n\n')
      map.addSource('points', {
        type: 'geojson',
        data: mapData
      });

      // Add our layer
      map.addLayer({
        id: 'circle',
        source: 'points', // this should be the id of source
        type: 'circle',
        paint: { 
          'circle-radius': { 
            'base': 1.75,
            'stops': [
              [10, 2],
              [22, 180]
            ]},
          'circle-color': 'green'
        }
      });



      map.on('click', 'circle', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        setCurrentTreeId(e.features[0].properties.id);
        setShowTree(true);
      });

      let lastId;
      var hoveredStateId = null;
       const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false
            });

      map.on('mousemove', 'circle', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (e.features[0].properties.id) {
              map.setFeatureState({ source: 'points', id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = e.features[0].id;
          const common = e.features[0].properties.common;
          map.setFeatureState({ source: 'points', id: hoveredStateId }, { hover: true });
          map.getCanvas().style.cursor = 'pointer';
          const coordinates = e.features[0].geometry.coordinates.slice();

          const HTML = `<p>Common: <b>${common}</b></p><p>Id: <b>${hoveredStateId}</b></p>`;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
        }
      });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
      map.on('mouseleave', 'circle', function() {
        if (hoveredStateId) {
          map.setFeatureState({ source: 'points', id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
        // lastId = undefined;
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

     

      // map.on('mousemove', 'circle', (e) => {
      //   const id = e.features[0].properties.id;

      //   if (id !== lastId) {
      //     lastId = id;
      //     const { common } = e.features[0].properties;

      //     // Change the pointer type on mouseenter
      //     map.getCanvas().style.cursor = 'pointer';

      //     const coordinates = e.features[0].geometry.coordinates.slice();

      //     const HTML = `<p>Common: <b>${common}</b></p><p>Id: <b>${id}</b></p>`;

      //     // Ensure that if the map is zoomed out such that multiple
      //     // copies of the feature are visible, the popup appears
      //     // over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //     }

      //     popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
      //   }
      // });

      // map.on('mouseleave', 'circle', function () {
      //   lastId = undefined;
      //   map.getCanvas().style.cursor = '';
      //   popup.remove();
      // });
    });
    
  }, [mapData]);

  // const treeListMap = useSelector(state => state.treemap.treeListMap);
  // const [address, setAddress] = useState('Alameda, CA');
  // const [addTree, setAddTreeSelected] = useState(false);
  // const [isMapDraggable, setMapDraggable] = useState(true);
  // const dispatch = useDispatch();

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const toggle = () => setModal(!userProfileOpen);
 
  const handleAddTree = (selected) => {
    (addTree === 'addTree') ? setAddTreeSelected(null) : setAddTreeSelected('addTree');
    (addTree || addTree === 'addTree' ) ? setMapDraggable(true) : setMapDraggable(false);
  };

  const handleOpenUserProfile = (selected) => {
    (userProfileOpen === 'userProfileOpen') ? setUserProfileOpen(null) : setUserProfileOpen('userProfileOpen');
    (userProfileOpen || userProfileOpen === 'userProfileOpen' ) ? setMapDraggable(true) : setMapDraggable(false);
  };

  // const [latlng, setLatLng] = useState();
  
  const handleClickedMap = (event) => {
    const functionName = 'handleClickedMap';
    let lat = event.lat;
    let lng  = event.lng;
    setLatLng([lat,lng])
  }
  // const key = config.googlemap.key;
  const [modal, setModal] = useState(false);


  // TODO figure out this

  // Define layout to use in Layer component
    // const layoutLayer = { 'icon-image': 'londonCycle' };


  const url = window.location.origin;
  const imagepath = `${url}/assets/images/map/`;
  const treeIcons = {
    fair:  `${imagepath}treeYellow.svg`,
    poor:  `${imagepath}treeRed.svg`,
    missing:  `${imagepath}treeOrange.svg`,
    good:  `${imagepath}treeGreen.svg`,
    well:  `${imagepath}treeGray.svg`,
    dead:  `${imagepath}treeBlack.svg`,
  };

    // Create an image for the Layer
  const image = new Image();
  image.src = treeIcons.green;
  const images = ['londonCycle', image];
  const treeRef = useRef();

  const [showTreePopper, setShowTreePopper] = useState(false);
  const iconCurrent = treeIcons.green;
  // console.log('treeee RIGHT BEFORE RENDER',showTree, currentTree);

  return (
    <div className="App">
      <div className="mapContainer">
        {/* Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
      {error && <div>Failed to load trees</div>}
      {userProfileOpen && <UserProfile toggle={toggle} modal={userProfileOpen}/>}
      {currentTreeId && <TreeData currentTreeId={currentTreeId} lng={currentTree.lng} lat={currentTree.lat} icon={iconCurrent} showTree={showTree} setShowTree={setShowTree}/>}

      
      
    </div>
  );
}

// const handleClickedTree = async (tree) => {
//   console.log('tree', tree);
//   const request = {
//       requestType: 'GetTree', 
//       lat: tree.lat,
//       lng:tree.lng
//     }
//   const dataSerialized = serializeData(request);
//   const BASE_URL = 'http://localhost:3002/treemap';
//   const URL = `${BASE_URL}?${dataSerialized}`;
//   const { data, error } = useSWR( URL, fetcher);
//   // console.log(await data, 'data DDDDDDD \n\n\n\n');
//   // setCurrentTree(await data);
//   // setShowTree(true);
//   return `<TreeData tree={${await data}} icon={iconCurrent} showTree={${true}} setShowTree={${setShowTree}}/>`;
// }

export const serializeData = (data) => {
  // console.log(data,'serializeData');
  return Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
}

export default Mapper;