import React, { Component, useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import mapboxgl from "mapbox-gl";
import moment from "moment";
import cx from "classnames";
import ReactDOM from "react-dom";
import "./AddTree.scss";

// const WATER_THE_TREES = "assets/images/logos/waterthetrees-fat.svg";
// const WATER_THE_TREES = "assets/images/logos/waterthetrees-viga.svg";
// const WATER_THE_TREES = "assets/images/logos/waterthetrees-riteous.svg";
const PLUS = "assets/images/map/plus.svg";





export const AddTree = (props) => {
  const componentName = "AddTree";
  console.log(componentName, 'props', props)
  const {map, setZoom} = Object(props);

  const [addTree, setAddTreeSelected] = useState(false);
  const [clickable, setClickable] = useState(false);

  const [mapDraggable, setMapDraggable] = useState(true);
  

  const [showAddTreeModal, setShowAddTreeModal] = useState(false);

  const handleAddTreeClick = (event) => {
    console.log('event', event.target.id, )
    
    addTree ? setMapDraggable(true) : setMapDraggable(false);

    if (addTree && clickable) {
      map.once('click', handleMapClickHandler);
    }
    map.off('click', handleMapClickHandler);

    // if (!addTree || !clickable) {
      
    // }
    // map.off('mousemove', onMove);
    // map.off('touchmove', onMove);
    
  }
  const [newMarker, setMarker] = useState(null);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  console.log('coordinatesNewTree', coordinatesNewTree);

  const handleMapClickHandler = (event) => {

    setClickable(false);
    setAddTreeSelected(false);
    const coordinates = event.lngLat;
    // var geojson = [
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [event.lngLat.lng, event.lngLat.lat]
    //     },
    //     properties: {
    //       'marker-color': '#3bb2d0',
    //       'marker-size': 'large',
    //       'marker-symbol': 'rocket'
    //     }
    //   }
    // ];
    // const marker = new mapboxgl.Marker({ draggable: mapDraggable })
    //   .setLngLat(coordinates)
    //   .addTo(map);
    const marker = loadNewMarker(coordinates);
    // loadImage(event.lngLat.lng, event.lngLat.lat);
    // setZoom(18);
    setMarker(marker);
    setCoordinatesNewTree(coordinates);
    map.off('click', handleMapClickHandler);
    map.on("click", handleClickedNewTree);
  }

  const loadNewMarker = (coordinates) => {
    const SPROUT = "assets/images/addtree/tree3.svg";
    const sproutImg = document.createElement('img'); 
    sproutImg.src = SPROUT;
    // sproutImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dicotyledonous_sprout.svg/210px-Dicotyledonous_sprout.svg.png';
    const marker = new mapboxgl.Marker({ 
      draggable: mapDraggable, 
      color: '#000000',
      scale: .05,
      element: sproutImg,
    })
      .setLngLat(coordinates)
      .addTo(map);


    return marker;
  }

  const loadImage = (lng, lat) => {
    map.loadImage(
      // 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dicotyledonous_sprout.svg/210px-Dicotyledonous_sprout.svg.png',
      function(error, image) {
          if (error) throw error;
          map.addImage('sprout', image);
          map.addSource('point', {
              'type': 'geojson',
              'data': {
                  'type': 'FeatureCollection',
                  'features': [{
                      'type': 'Feature',
                      'geometry': {
                          'type': 'Point',
                          'coordinates': [lng, lat]
                      }
                  }]
              }
          });
          map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'point',
              'layout': {
                  'icon-image': 'sprout',
                  'icon-size': 0.25
              }
          });
      }
    );
  }


  const handleClickedNewTree = (event) => {
    console.log('coordinatesNewTree', coordinatesNewTree);
    setShowAddTreeModal(true);
    console.log('showAddTreeModal',showAddTreeModal);

    //TODO - save tree info and build out modal

    // TODO figure out off click
    // map.off("click", handleClickedNewTree);
  }

  useEffect(() => {
    if (!addTree) return;
    if (addTree && clickable) {
      console.log(  'addTree', addTree, )
      console.log(  'clickable', clickable, );
      map.on('click', handleMapClickHandler);
    } 

  },[addTree,clickable]);



  return (
    <>
      <div className="addtree">
        <img 
          id="addtree"
          key="AddTreeButton"
          className="addtree__icon"
          onClick={(event) => {setZoom(10);setClickable(true);setAddTreeSelected(!addTree);}}
          src={PLUS} 
        />

        <div>
          <Modal isOpen={showAddTreeModal}>
            <ModalHeader toggle={() => setShowAddTreeModal(!showAddTreeModal)}>
              AddTree
            </ModalHeader>
            <ModalBody>
              AddTree
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};