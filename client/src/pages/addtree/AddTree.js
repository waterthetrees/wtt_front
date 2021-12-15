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

let currentMarkers = [];
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
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mutateUser = useUserMutation();
  const [plantMarkerOnMap, setPlantMarkerOnMap] = useState(false);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [plantButtonText, setPlantButtonText] = useState('PLANT');
  const plantTooltip = isMobile ? 'PLANTING' : 'You can now drag the tree marker around to your location';

  const removeMarkers = () => { currentMarkers[0].remove(); currentMarkers = []; };

  const handleOnPlantClick = (event) => {
    event.preventDefault();
    if (!isAuthenticated) loginWithRedirect();
    if (isAuthenticated) mutateUser.mutate(user);

    if (isMobile && event.target.innerText === 'PLANT') geolocater.trigger();
    setPlantMarkerOnMap(!plantMarkerOnMap);
    setPlantButtonText(plantMarkerOnMap ? 'PLANT' : 'PLANTING');
    if (plantMarkerOnMap && currentMarkers.length >= 1) {
      removeMarkers();
      // remove geolocator so it doesnt go to watch mode
      geolocater.onRemove();
      // add geolocator back
      map.addControl(geolocater);
    }
  };

  const handleAddMarker = (event, coordinates) => {
    if (!plantMarkerOnMap) return;
    if (event) event.preventDefault();
    const coords = coordinatesNewTree || coordinates;
    // if theres already a marker on the map, don't add more!
    if (isMobile && currentMarkers.length >= 1) return;
    if (coords && plantMarkerOnMap) {
      map.jumpTo({ coords, zoom: (isMobile) ? [20] : [18] });

      const marker = new mapboxgl.Marker(createImageForMarker())
        .setLngLat(coords)
        .addTo(map);

      if (isMobile) setShowAddTreeModal(!showAddTreeModal);
      currentMarkers.push(marker);
      marker.getElement().addEventListener('click',
        () => setShowAddTreeModal(!showAddTreeModal));

      if (!isMobile) {
        marker.on('dragend', () => {
          const lngLat = marker.getLngLat();
          setCoordinatesNewTree([lngLat.lng, lngLat.lat]);
        });
        const lngLat = marker.getLngLat();
        marker.on('dragend', lngLat);

        setCoordinatesNewTree([lngLat.lng, lngLat.lat]);
        marker.on('click', () => setShowAddTreeModal(!showAddTreeModal));
      }
    }
  };

  geolocater.on('geolocate', (position) => {
    const coordinates = [position.coords.longitude, position.coords.latitude];
    map.setCenter(coordinates);
    map.jumpTo({ coordinates, zoom: [20] });
    setCoordinatesNewTree(coordinates);

    if (isMobile) handleAddMarker(null, coordinates);
    if (plantMarkerOnMap) {
      map.off('click', handleOnPlantClick);
    }
  });

  map.on('click', (e) => {
    if (isMobile) return;
    const coordinates = e.lngLat;
    map.setCenter([coordinates.lng, coordinates.lat]);
    if (currentMarkers.length >= 1) removeMarkers();
    handleAddMarker(e, [coordinates.lng, coordinates.lat]);
  });

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
