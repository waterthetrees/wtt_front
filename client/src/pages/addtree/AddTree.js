/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactTooltip from 'react-tooltip';
import cx from 'clsx';
import './AddTree.scss';

import { useAuth0 } from '@auth0/auth0-react';
import { useUserMutation } from '../../api/queries';
import AddTreeModal from './AddTreeModal';
import { isMobile } from './utilities';

function onDragEndd(marker) {
  const lngLat = marker.getLngLat();
  return lngLat;
}

export const currentMarkers = [];
// let renderCount = 0;

const createImageForMarker = () => {
  const sproutImg = document.createElement('img');
  sproutImg.src = 'assets/images/addtree/tree12.svg';
  const imageForMarker = {
    element: sproutImg,
    draggable: !isMobile,
    scale: 0.003,
  };
  return imageForMarker;
};

export default function AddTree({
  map, geolocater,
  // center, setCenter,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mutateUser = useUserMutation();
  const [plantMarkerOnMap, setPlantMarkerOnMap] = useState(false);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [plantButtonText, setPlantButtonText] = useState('PLANT');

  // const plantButtonText = plantMarkerOnMap ? 'PLANTING' : 'PLANT';
  const plantTooltip = isMobile ? 'PLANTING' : 'You can now drag the tree marker around to your location';

  const removeMarker = () => currentMarkers.map((currentMarker) => currentMarker.remove());

  const handleOnPlantClick = (event) => {
    event.preventDefault();
    if (!isAuthenticated) loginWithRedirect();
    if (isAuthenticated) mutateUser.mutate(user);

    console.log(event.target.innerText, event.target.innerHTML, event.target.outerText);
    if (isMobile && event.target.innerText === 'PLANT') geolocater.trigger();
    setPlantMarkerOnMap(!plantMarkerOnMap);
    setPlantButtonText(plantMarkerOnMap ? 'PLANT' : 'PLANTING');
    if (plantMarkerOnMap && currentMarkers.length >= 1) {
      removeMarker();
    }
  };

  console.log('handleOnPlantClick plantMarkerOnMap', plantMarkerOnMap);
  geolocater.on('geolocate', (position) => {
    // console.log('geolocate', position);
    const coordinates = [position.coords.longitude, position.coords.latitude];
    map.setCenter(coordinates);
    map.jumpTo({ coordinates, zoom: [20] });
    setCoordinatesNewTree(coordinates);
    if (plantMarkerOnMap) {
      map.off('click', handleOnPlantClick);
    }
  });

  const handleAddMarker = (event, coordinates) => {
    event.preventDefault();
    console.log('handleAddMarker coordinates', coordinates);
    const { lng, lat } = coordinates;
    // console.log('handleAddMarker coordinatesNewTree', coordinatesNewTree);
    const coords = coordinatesNewTree || [lng, lat];
    // console.log('handleAddMarker coords', coords);
    if (!plantMarkerOnMap) return;
    // if theres already a marker on the map, don't add more!
    if (isMobile && currentMarkers.length >= 1) return;
    // const center = map.getCenter();
    if (coords && plantMarkerOnMap) {
      map.jumpTo({ coords, zoom: (isMobile) ? [20] : [18] });
      const marker = new mapboxgl.Marker(createImageForMarker())
        .setLngLat(coords)
        .addTo(map);
      marker.getElement().addEventListener('click',
        () => setShowAddTreeModal(!showAddTreeModal));
      currentMarkers.push(marker);
      if (isMobile) setShowAddTreeModal(!showAddTreeModal);

      if (!isMobile) {
        marker.on('dragend', () => {
          const lngLat = onDragEndd(marker);
          //   // map.setCenter(lngLat);
          setCoordinatesNewTree(lngLat);
        });
        const lngLat = onDragEndd(marker);
        marker.on('dragend', lngLat);
        // setCenter(lngLat);
        map.setCenter(lngLat);

        setCoordinatesNewTree(lngLat);
        marker.on('click', () => setShowAddTreeModal(!showAddTreeModal));
      }
    }
  };

  // map.on('style.load', () => {
  map.on('click', (e) => {
    // setCoordinatesNewTree(e.lngLat);
    const coordinates = e.lngLat;
    // new mapboxgl.Popup()
    //   .setLngLat(coordinates)
    //   .setHTML(`Lng: ${coordinates.lng}<br>Lat: ${coordinates.lat}`)
    //   .addTo(map);
    if (!isMobile && currentMarkers.length >= 1) removeMarker();
    handleAddMarker(e, coordinates);
  });
  // });

  useEffect(() => {
    if (plantMarkerOnMap) {
      map.on('click', handleAddMarker);
    }
    return () => {
      map.off('click', handleAddMarker);
    };
  }, [plantMarkerOnMap]);

  useEffect(() => {
    if (!coordinatesNewTree) return;
    if (isMobile) {
      handleAddMarker();
    }
  }, [coordinatesNewTree]);

  // console.log(showAddTreeModal, 'showAddTreeModal ');
  // renderCount += 1;
  // console.log(renderCount, 'renderCount');
  return (
    <div>
      <button
        data-tip={plantTooltip}
        type="button"
        className={cx('addtree__btn', (plantMarkerOnMap) ? 'addtree__btn-selected' : '')}
        onClick={handleOnPlantClick}
      >
        <div className={cx('addree__plus-centeredtxt', (plantMarkerOnMap) ? 'addree__plus-centeredtxt-planting' : '')}>
          {plantButtonText}
        </div>
      </button>

      {plantMarkerOnMap && coordinatesNewTree && showAddTreeModal && (
        <AddTreeModal
          showAddTreeModal={showAddTreeModal}
          setShowAddTreeModal={setShowAddTreeModal}
          plantMarkerOnMap={plantMarkerOnMap}
          setPlantMarkerOnMap={setPlantMarkerOnMap}
          coordinatesNewTree={coordinatesNewTree}
        />
      )}
      <ReactTooltip
        type="info"
        place="right"
        disable={!!(plantMarkerOnMap)}
        delayShow={500}
      />

    </div>
  );
}
