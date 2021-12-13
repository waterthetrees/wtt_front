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

  const plantButtonText = plantMarkerOnMap ? 'PLANTING' : 'PLANT';

  const handleOnPlantClick = () => {
    if (!isAuthenticated) loginWithRedirect();
    if (isAuthenticated) mutateUser.mutate(user);
    if (isMobile) geolocater.trigger();
    setPlantMarkerOnMap(!plantMarkerOnMap);
  };

  console.log('handleOnPlantClick plantMarkerOnMap', plantMarkerOnMap);
  geolocater.on('geolocate', (position) => {
    console.log('geolocate', position);
    const coordinates = [position.coords.longitude, position.coords.latitude];
    map.setCenter(coordinates);
    map.jumpTo({ coordinates, zoom: [20] });
    setCoordinatesNewTree(coordinates);
    if (plantMarkerOnMap) {
      map.off('click', handleOnPlantClick);
    }
  });
  // REMOVE THIS FOR PURELY DOM MARKER
  useEffect(() => {
    if (!plantMarkerOnMap && currentMarkers.length >= 1) {
      currentMarkers.map((currentMarker) => currentMarker.remove());
    }
  }, [plantMarkerOnMap]);

  useEffect(() => {
    // console.log('center in useEffect', center);
    if (!coordinatesNewTree) return;
    if (!plantMarkerOnMap) return;
    const center = map.getCenter();
    // if (currentMarkers.length >= 1 || currentMarkers !== null) return;
    if (coordinatesNewTree && plantMarkerOnMap) {
      console.log('coordinatesNewTree', coordinatesNewTree);
      console.log('geolocate.coords', geolocater.coords);
      map.jumpTo({ coordinatesNewTree, zoom: [20] });
      const marker = new mapboxgl.Marker(createImageForMarker())
        .setLngLat(coordinatesNewTree)
        .addTo(map);
      marker.getElement().addEventListener('click',
        () => setShowAddTreeModal(!showAddTreeModal));
      currentMarkers.push(marker);
      if (isMobile) setShowAddTreeModal(!showAddTreeModal);

      if (!isMobile) {
        marker.on('dragend', () => {
          const lngLat = onDragEndd(marker);
          map.setCenter(lngLat);
          // setCenter(lngLat);
        });
        const lngLat = onDragEndd(marker);
        marker.on('dragend', lngLat);
        // setCenter(lngLat);
        map.setCenter(lngLat);
        marker.on('click', () => setShowAddTreeModal(!showAddTreeModal));
      }
    }
  }, [coordinatesNewTree]);

  // console.log(showAddTreeModal, 'showAddTreeModal ');
  // renderCount += 1;
  // console.log(renderCount, 'renderCount');
  return (
    <div>
      <button
        data-tip="Click on map to add a tree"
        type="button"
        className={cx('addtree__btn', (plantMarkerOnMap) ? 'addtree__btn-selected' : '')}
        onClick={handleOnPlantClick}
      >
        <div className="addree__plus-centeredtxt">
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
        text="tooltip text"
      />

    </div>
  );
}
