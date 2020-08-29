import React, { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// ES6
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import moment from 'moment';

import { Button, ButtonToggle,Modal, ModalHeader, ModalBody, ModalFooter, Progress, ButtonGroup, Label, Input } from 'reactstrap';

import { postTreeStatus, getTreeListMap, getTree } from '../../actions/index.js';
import { TreeData } from './TreeData.js';
import { TreeAdd } from '../treemap/TreeAdd.js';
import UserProfile from '../userprofile';
import config from '../../config.js';


const has = Object.prototype.hasOwnProperty;
const today = moment().format('YYYY-MM-DD');



const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrY3lmcWVqcDA5ZDYyenFpdG13bWdrOHYifQ.6er3tXeahhVUtgiu_pqWFw'
});

function Mapper() {
  const componentName = 'Mapper';
  const [zoom, setZoom] = useState([15]);
  const [center, setCenter] = useState({lng:-122.277048, lat: 37.772604});

  useEffect(() => {
    if (!treeListMap) {
      const request = {
            requestType: 'GetMap', 
            // sLat: bounds[1] || 37.754631, wLng: bounds[0] || -122.350261,
            // nLat: bounds[3] || 37.788988, eLng: bounds[2] || -122.214599
            sLat: (center.lat - .01), wLng: (center.lng - .001),
            nLat: (center.lat + .01), eLng: (center.lng + .001)
        }
      console.log('in if',request);
      async function fetchData() {
        const treeListMap = await dispatch(getTreeListMap(request));
        return treeListMap;
      }
      fetchData();

    }
  }, []);

  const treeListMap = useSelector(state => state.treemap.treeListMap);
  const [address, setAddress] = useState('Alameda, CA');
  const [addTree, setAddTreeSelected] = useState(false);
  const [isMapDraggable, setMapDraggable] = useState(true);
  const dispatch = useDispatch();

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

  const [latlng, setLatLng] = useState();
  
  const handleClickedMap = (event) => {
    const functionName = 'handleClickedMap';
    let lat = event.lat;
    let lng  = event.lng;
    setLatLng([lat,lng])
  }
  const key = config.googlemap.key;
  const [modal, setModal] = useState(false);


  // TODO figure out this

  // Define layout to use in Layer component
    const layoutLayer = { 'icon-image': 'londonCycle' };


  const url = window.location.origin;
  const imagepath = `${url}/assets/images/map/`;
  const treeIcons = {
    yellow:  `${imagepath}treeYellow.svg`,
    red:  `${imagepath}treeRed.svg`,
    orange:  `${imagepath}treeOrange.svg`,
    green:  `${imagepath}treeGreen.svg`,
    well:  `${imagepath}treeGray.svg`,
    black:  `${imagepath}treeBlack.svg`,
  };

      // Create an image for the Layer
    const image = new Image();
    image.src = treeIcons.green;
    const images = ['londonCycle', image];
    const treeRef = useRef();
    const [currentTree, setCurrentTree] = useState(false);
    const [showTree, setShowTree] = useState(false);
    const [showTreePopper, setShowTreePopper] = useState(false);
    const iconCurrent = treeIcons.green;
    console.log('treeee',showTree, currentTree);

    const handleClickedTree = async (treeId,tree) => {
      const request = {
          requestType: 'GetTree', 
          inventoryid: treeId
        }
      console.log(treeId,tree, 'treeId,tree LALALALA \n\n\n\n');
      const treeData = await dispatch(getTree(request));
      console.log(await treeData, 'treeData DDDD \n\n\n\n');
      setCurrentTree(await treeData);
      setShowTree(true);
    }

      // style="mapbox://styles/mapbox/streets-v9"
      //       <Layer type="circle" id="treesmap" 
      // paint={{ 'circle-radius': { 'base': 1.75,
      //                                   'stops': [
      //                                     [10, 2],
      //                                     [22, 180]
      //                                     ]
      //                                   },
      //           // color circles by ethnicity, using a match expression
      //           // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
      //           'circle-color': [
      //             'match', ['get', 'currentTree'],
      //             'White',
      //               '#fbb03b',
      //             'Black',
      //               '#223b53',
      //             'Hispanic',
      //               '#e55e5e',
      //             'Asian',
      //               '#3bb2d0',
      //             /* other */ '#green'
      //             ]
      //           }}
      //     >
  return (
    <Map
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      style="mapbox://styles/mapbox/light-v10"
      center={[center.lng, center.lat]}
      zoom={zoom}
    >
      

   <Layer type="circle" id="treesmap" 
      paint={{ 'circle-radius': { 'base': 1.75,
                                        'stops': [
                                          [10, 2],
                                          [22, 180]
                                          ]
                                        },
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': [
                  'match', ['get', 'currentTree'],
                  'White',
                    '#fbb03b',
                  'Black',
                    '#223b53',
                  'Hispanic',
                    '#e55e5e',
                  'Asian',
                    '#3bb2d0',
                  /* other */ 'green'
                  ]
                }}
          >


          {treeListMap && treeListMap.length > 0 && treeListMap.map(tree => {
          console.log('tree----',tree);
            // const statusColor = tree.status;
            // const iconColor = createTreeMarker(tree);
            return (<Feature
              key={tree.inventoryid}
              onClick={() => {handleClickedTree(tree.inventoryid, tree);}}
              onHover={() => {setShowTreePopper(tree);}}
              coordinates={[tree.longitude, tree.latitude]}
            />);
          })}

      </Layer>

      {showTreePopper && (
        <Popup
          coordinates={[currentTree.longitude,currentTree.latitude]}
          offset={{
            'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
          }}>
          <h1>{currentTree.commonname}</h1>
        </Popup>
      )}

      {showTree && (<TreeData tree={currentTree} icon={iconCurrent} showTree={showTree} setShowTree={setShowTree}/>)}


      <div className="tree__nav">
      <Button className="treenav__button" color='success' sz='lg' type='button' name='userProfileOpen' 
          onClick={handleOpenUserProfile} 
          active={userProfileOpen === 'userProfileOpen'}>
          <img src="assets/images/users/user_snowball_white.svg" />
        </Button>
        <Button className="treenav__button" color='success' sz='lg' type='button' name='addTree' 
          onClick={handleAddTree} 
          active={addTree === 'addTree'}>
          <img src="assets/images/map/tree_add.svg" />
        </Button>
     
        </div>
      {userProfileOpen && <UserProfile toggle={toggle} modal={userProfileOpen}/>}
      
    </Map>
  )
}

const TreeMarker = ({ tree, icon, showTree }) => {
  const component_name = 'TreeMarker';
  console.log(component_name, 'tree hhhh', tree)
  const dispatch = useDispatch();
  const [modal, setModal] = useState(showTree);
  const toggle = () => setModal(!modal);

  const changeStatus = (event) => setStatus(event.target.name);
  const changeLastWatered = () => {
    setWaterDate(moment().format('ddd, MMM D YYYY'));
    setMedal(!getmedal);
  };

  const saved = (event) => dispatch(postTreeStatus({email, request:'savetree', status, watered, treetag}));
  
  return (
  <div className='Tree__label' key={tree.inventoryid}>
    <Button color="link" onClick={toggle}><img className='Tree__icon' src={icon} height="50px"/></Button>
    {modal && <TreeData tree={tree} modal={modal} today={today} toggle={toggle}/>}
  </div>
)}

export default Mapper;