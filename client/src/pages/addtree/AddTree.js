/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactTooltip from 'react-tooltip';
import cx from 'clsx';
import './AddTree.scss';

import { useAuth0 } from '@auth0/auth0-react';
import { useUserMutation } from '../../api/queries';

import AddTreeModal from './AddTreeModal';

let renderCount = 0;
const currentMarkers = [];

function AddTree({
  map, setZoom, center, setCenter,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [addTreeSelected, setAddTreeSelected] = useState(false);
  const mutateUser = useUserMutation();

  const handleOnClick = () => {
    if (!isAuthenticated) loginWithRedirect();
    if (isAuthenticated) mutateUser.mutate(user);

    setAddTreeSelected(!addTreeSelected);
  };

  // REMOVE THIS FOR PURELY DOM MARKER
  useEffect(() => {
    if (!addTreeSelected) {
      if (currentMarkers !== null) {
        currentMarkers.map((currentMarker) => currentMarker.remove());
      }
    }
  }, [addTreeSelected]);

  renderCount += 1;

  return (
    <div>

      <button
        data-tip="Click on map to add a tree"
        type="button"
        className={cx('addtree__btn', (addTreeSelected) ? 'addtree__btn-selected' : '')}
        onClick={handleOnClick}
      >
        <div className="addree__plus-centeredtxt">
          PLANT
        </div>
      </button>
      <TreeMarker
        map={map}
        setAddTreeSelected={setAddTreeSelected}
        addTreeSelected={addTreeSelected}
        setZoom={setZoom}
        coordinatesNewTree={center}
        setCoordinatesNewTree={setCenter}
      />
      <ReactTooltip
        type="info"
        place="right"
        disable={!!(addTreeSelected)}
        delayShow={500}
      />

    </div>
  );
}

const TreeMarker = ({
  map, addTreeSelected, setAddTreeSelected,
  setZoom, coordinatesNewTree, setCoordinatesNewTree,
}) => {
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const handleMarkerClick = () => {
    setShowAddTreeModal(true);
  };

  const loadNewMarker = (coordinates) => {
    const SPROUT = 'assets/images/addtree/tree12.svg';
    const sproutImg = document.createElement('img');
    sproutImg.src = SPROUT;
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: '#000000',
      scale: 0.05,
      element: sproutImg,
    })
      .setLngLat(coordinates)
      .addTo(map);

    setCoordinatesNewTree(coordinates);
    function onDragEndd() {
      const lngLat = marker.getLngLat();
      setCoordinatesNewTree(lngLat);
    }

    marker.on('dragend', onDragEndd);
    currentMarkers.push(marker);
    marker.getElement().addEventListener('click', handleMarkerClick);
    return marker;
  };

  const handleMapClick = (event) => {
    const coordinates = event.lngLat;
    loadNewMarker(coordinates);

    map.off('click', handleMapClick);
    setZoom(19);
    map.flyTo({
      center: coordinates,
      zoom: [19],
    });
  };

  useEffect(() => {
    if (!addTreeSelected) return;

    if (addTreeSelected) {
      map.on('click', handleMapClick);
    } else {
      map.off('click', handleMapClick);
    }
  }, [addTreeSelected]);

  return coordinatesNewTree
    && showAddTreeModal
    && (
      <AddTreeModal
        showAddTreeModal={showAddTreeModal}
        setShowAddTreeModal={setShowAddTreeModal}
        renderCount={renderCount}
        coordinatesNewTree={coordinatesNewTree}
        setAddTreeSelected={setAddTreeSelected}
      />
    );
};

export default AddTree;
