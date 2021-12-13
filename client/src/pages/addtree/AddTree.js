/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactTooltip from 'react-tooltip';
import cx from 'clsx';
import './AddTree.scss';

import { useAuth0 } from '@auth0/auth0-react';
import { useUserMutation } from '../../api/queries';

// import AddTreeModal from './AddTreeModal';
// import { TreeMarker } from './TreeMarker';
import { isMobile } from './utilities';
import AddTreeModal from './AddTreeModal';

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
  map, center, setCenter, geolocater,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mutateUser = useUserMutation();
  const [plantMarkerOnMap, setPlantMarkerOnMap] = useState(false);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);

  const handleOnPlant = () => {
    if (!isAuthenticated) loginWithRedirect();
    if (isAuthenticated) mutateUser.mutate(user);
    if (isMobile && !plantMarkerOnMap) {
      console.log('is mobile');
      geolocater.trigger();
    }
    setPlantMarkerOnMap(!plantMarkerOnMap);
    console.log('handleOnPlant event', plantMarkerOnMap);
  };

  const handlePlantClick = () => setPlantMarkerOnMap(!plantMarkerOnMap);

  // REMOVE THIS FOR PURELY DOM MARKER
  useEffect(() => {
    if (!plantMarkerOnMap && currentMarkers.length >= 1) {
      currentMarkers.map((currentMarker) => currentMarker.remove());
    }
  }, [plantMarkerOnMap]);

  useEffect(() => {
    if (!plantMarkerOnMap && (currentMarkers.length === 0 || currentMarkers === null)) return;
    const marker = new mapboxgl.Marker(createImageForMarker()).setLngLat(center).addTo(map);
    map.jumpTo({ center, zoom: [20] });
    marker.getElement().addEventListener('click', () => setShowAddTreeModal(true));
    currentMarkers.push(marker);
    if (isMobile) setShowAddTreeModal(true);

    if (!isMobile) {
      marker.on('dragend', () => {
        const lngLat = onDragEndd(marker);
        setCenter(lngLat);
      });
      const lngLat = onDragEndd(marker);
      marker.on('dragend', lngLat);
      setCenter(lngLat);
      marker.on('click', () => setShowAddTreeModal(true));
    }
  }, [plantMarkerOnMap]);

  geolocater.on('geolocate', (position) => {
    const coordinates = [position.coords.longitude, position.coords.latitude];
    setCoordinatesNewTree(coordinates);
    map.setCenter(coordinates);
    setPlantMarkerOnMap(true);
    map.off('click', handlePlantClick);
  });

  // renderCount += 1;
  // console.log(renderCount, 'renderCount');
  return (
    <div>
      <button
        data-tip="Click on map to add a tree"
        type="button"
        className={cx('addtree__btn', (plantMarkerOnMap) ? 'addtree__btn-selected' : '')}
        onClick={handleOnPlant}
      >
        <div className="addree__plus-centeredtxt">
          {plantMarkerOnMap ? 'PLANTING' : 'PLANT'}
        </div>
      </button>

      {coordinatesNewTree && showAddTreeModal && (
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
