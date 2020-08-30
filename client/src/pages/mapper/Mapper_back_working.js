import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// ES6
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  Cluster,
  GeoJSONLayer,
} from "react-mapbox-gl";

import moment from "moment";

import {
  Button,
  ButtonToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  ButtonGroup,
  Label,
  Input,
} from "reactstrap";

import {
  postTreeStatus,
  getTreeListMap,
  getTree,
} from "../../actions/index.js";
import { TreeData } from "./TreeData.js";
import { TreeAdd } from "../treemap/TreeAdd.js";
import UserProfile from "../userprofile";
import config from "../../config.js";

const has = Object.prototype.hasOwnProperty;
const today = moment().format("YYYY-MM-DD");

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrY3lmcWVqcDA5ZDYyenFpdG13bWdrOHYifQ.6er3tXeahhVUtgiu_pqWFw",
});

function Mapper() {
  const componentName = "Mapper";
  const [zoom, setZoom] = useState([18]);
  const [center, setCenter] = useState({ lat: 37.779369, lng: -122.196532 });

  useEffect(() => {
    if (!treeListMap) {
      // const request = {
      //       requestType: 'GetMapSubset',
      //       sLat: (center.lat - .01), wLng: (center.lng - .001),
      //       nLat: (center.lat + .01), eLng: (center.lng + .001)
      //   }

      const request = {
        requestType: "GetMap",
        city: "Oakland",
      };
      // console.log('in if',request);
      async function fetchData() {
        const treeListMap = await dispatch(getTreeListMap(request));
        // const treeData = await dispatch(getTree(requestTree));
        return treeListMap;
      }
      fetchData();
    }
  }, []);

  const treeListMap = useSelector((state) => state.treemap.treeListMap);
  const [address, setAddress] = useState("Alameda, CA");
  const [addTree, setAddTreeSelected] = useState(false);
  const [isMapDraggable, setMapDraggable] = useState(true);
  const dispatch = useDispatch();

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const toggle = () => setModal(!userProfileOpen);

  const handleAddTree = (selected) => {
    addTree === "addTree"
      ? setAddTreeSelected(null)
      : setAddTreeSelected("addTree");
    addTree || addTree === "addTree"
      ? setMapDraggable(true)
      : setMapDraggable(false);
  };

  const handleOpenUserProfile = (selected) => {
    userProfileOpen === "userProfileOpen"
      ? setUserProfileOpen(null)
      : setUserProfileOpen("userProfileOpen");
    userProfileOpen || userProfileOpen === "userProfileOpen"
      ? setMapDraggable(true)
      : setMapDraggable(false);
  };

  const [latlng, setLatLng] = useState();

  const handleClickedMap = (event) => {
    const functionName = "handleClickedMap";
    let lat = event.lat;
    let lng = event.lng;
    setLatLng([lat, lng]);
  };
  const key = config.googlemap.key;
  const [modal, setModal] = useState(false);

  // TODO figure out this

  // Define layout to use in Layer component
  const layoutLayer = { "icon-image": "londonCycle" };

  const url = window.location.origin;
  const imagepath = `${url}/assets/images/map/`;
  const treeIcons = {
    fair: `${imagepath}treeYellow.svg`,
    poor: `${imagepath}treeRed.svg`,
    missing: `${imagepath}treeOrange.svg`,
    good: `${imagepath}treeGreen.svg`,
    well: `${imagepath}treeGray.svg`,
    dead: `${imagepath}treeBlack.svg`,
  };

  // Create an image for the Layer
  const image = new Image();
  image.src = treeIcons.green;
  const images = ["londonCycle", image];
  const treeRef = useRef();
  const [currentTree, setCurrentTree] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showTreePopper, setShowTreePopper] = useState(false);
  const iconCurrent = treeIcons.green;
  // console.log('treeee',showTree, currentTree);

  const handleClickedTree = async (tree) => {
    const request = {
      requestType: "GetTree",
      lat: tree.lat,
      lng: tree.lng,
    };
    // console.log(tree, 'treeId,tree LALALALA \n\n\n\n');
    const treeData = await dispatch(getTree(request));
    // console.log(await treeData, 'treeData DDDD \n\n\n\n');
    setCurrentTree(await treeData);
    setShowTree(true);
  };

  console.log("treeListMap", treeListMap, "treeListMap \n\n\n\n");
  // console.log(currentTree, 'currentTree \n\n\n\n');
  // const color = (treeListMap) ? {
  //   fair:  `yellow`,
  //   poor:  `red`,
  //   missing:  `orange`,
  //   good:  `green`,
  //   well:  `gray`,
  //   dead:  `black`
  // }:{};
  return (
    <Map
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
      style="mapbox://styles/mapbox/light-v10"
      center={[center.lng, center.lat]}
      zoom={zoom}
    >
      {treeListMap && (
        <GeoJSONLayer
          data={treeListMap}
          symbolLayout={{
            "text-field": "{place}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
          }}
        />
      )}

      {/*<Cluster ClusterMarkerFactory={clusterMarker}>
              {treeListMap && treeListMap.features.map((feature, key) =>
                  <TreeMarker
                    key={key}
                    coordinates={feature.geometry}
                    tree={feature}
                    onClick={() => {handleClickedTree(feature.geometry);}}>
                    M
                  </TreeMarker>
                )
              }
            </Cluster>*/}

      {/*<Layer type="symbol" id="treesmap" layout={layoutLayer} images={images}>*/}

      <Layer
        type="circle"
        id="treesmap"
        paint={{
          "circle-radius": {
            base: 1.75,
            stops: [
              [10, 2],
              [22, 180],
            ],
          },
          "circle-color": "green",
        }}
      >
        {treeListMap &&
          treeListMap.features.map((tree) => {
            // console.log('tree----',tree);
            // const statusColor = tree.status;
            // const iconColor = createTreeMarker(tree);
            return (
              <Feature
                key={tree.id}
                onClick={() => {
                  handleClickedTree(tree);
                }}
                onHover={() => {
                  setCurrentTree(tree);
                  setShowTreePopper(true);
                }}
                coordinates={[tree.lng, tree.lat]}
              />
            );
          })}
      </Layer>

      {showTreePopper && (
        <Popup
          coordinates={[currentTree.lat, currentTree.lat]}
          offset={{
            "bottom-left": [12, -38],
            bottom: [0, -38],
            "bottom-right": [-12, -38],
          }}
        >
          <h1>{currentTree.common}</h1>
        </Popup>
      )}

      {showTree && currentTree && (
        <TreeData
          tree={currentTree}
          icon={iconCurrent}
          showTree={showTree}
          setShowTree={setShowTree}
        />
      )}

      <div className="tree__nav">
        <Button
          className="treenav__button"
          color="success"
          sz="lg"
          type="button"
          name="userProfileOpen"
          onClick={handleOpenUserProfile}
          active={userProfileOpen === "userProfileOpen"}
        >
          <img src="assets/images/users/user_snowball_white.svg" />
        </Button>
        <Button
          className="treenav__button"
          color="success"
          sz="lg"
          type="button"
          name="addTree"
          onClick={handleAddTree}
          active={addTree === "addTree"}
        >
          <img src="assets/images/map/tree_add.svg" />
        </Button>
      </div>
      {userProfileOpen && (
        <UserProfile toggle={toggle} modal={userProfileOpen} />
      )}
    </Map>
  );
}

const clusterMarker = (coordinates) => (
  <TreeMarker coordinates={coordinates}>C</TreeMarker>
);

const TreeMarker = ({ tree, icon, showTree }) => {
  const component_name = "TreeMarker";
  // console.log(component_name, 'tree hhhh', tree)
  const dispatch = useDispatch();
  const [modal, setModal] = useState(showTree);
  const toggle = () => setModal(!modal);

  const changeStatus = (event) => setStatus(event.target.name);
  const changeLastWatered = () => {
    setWaterDate(moment().format("ddd, MMM D YYYY"));
    setMedal(!getmedal);
  };

  const saved = (event) =>
    dispatch(
      postTreeStatus({ email, request: "savetree", status, watered, treetag })
    );

  return (
    <div className="Tree__label" key={tree.inventoryid}>
      <Button color="link" onClick={toggle}>
        <img className="Tree__icon" src={icon} height="50px" />
      </Button>
      {modal && (
        <TreeData tree={tree} modal={modal} today={today} toggle={toggle} />
      )}
    </div>
  );
};

export default Mapper;
