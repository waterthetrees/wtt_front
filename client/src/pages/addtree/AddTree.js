/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import mapboxgl from 'mapbox-gl';
import cx from 'clsx';
import { useUserMutation } from '../../api/queries';
import AddTreeModal from './AddTreeModal';
import useAuthUtils from '../../components/Auth/useAuthUtils';
import './AddTree.scss';
import { isMobile } from './utilities';

let currentMarkers = [];
// let renderCount = 0;

const createImageForMarker = () => {
  const sproutImg = document.createElement('img');
  sproutImg.src = 'assets/images/addtree/tree12.svg';
  sproutImg.alt = 'sprout-marker';
  const imageForMarker = {
    element: sproutImg,
    // draggable: !isMobile,
    draggable: true,
    scale: 0.003,
  };
  return imageForMarker;
};

export default function AddTree({
  map, geolocater,
}) {
  const { user, isAuthenticated } = useAuth0();
  const mutateUser = useUserMutation();
  const { loginToCurrentPage } = useAuthUtils();
  const [plantMarkerOnMap, setPlantMarkerOnMap] = useState(false);
  const [showAddTreeModal, setShowAddTreeModal] = useState(false);
  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [plantButtonText, setPlantButtonText] = useState('PLANT');

  const removeMarkers = () => { currentMarkers[0].remove(); currentMarkers = []; };

  const removeAddGeolocater = () => {
    // remove geolocator so it doesnt go to watch mode
    geolocater.onRemove();
    // add geolocator control back on map seems hacky but works
    // would be nicer to just turn off watch mode
    map.addControl(geolocater);
  };

  useEffect(() => {
    if (plantMarkerOnMap) return;
    if (currentMarkers.length) removeMarkers();
    if (geolocater._watchState !== 'OFF') removeAddGeolocater();
  }, [plantMarkerOnMap]);

  const handleOnPlantClick = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      mutateUser.mutate(user);
    }

    if (event.target.innerText === 'PLANT') {
      setPlantButtonText('PLANTING');
      if (isMobile) {
        geolocater.trigger();
      }
    } else {
      setPlantButtonText('PLANT');
    }

    setPlantMarkerOnMap(!plantMarkerOnMap);
    if (event.target.innerText !== 'PLANT' && geolocater._watchState !== 'OFF') removeAddGeolocater();
  };

  const handleAddMarker = (event, coordinates) => {
    if (event) event.preventDefault();
    if (!plantMarkerOnMap) return;
    const coords = coordinatesNewTree || coordinates;
    // if theres already a marker on the map, don't add more!
    if (currentMarkers.length >= 1) return;

    if (coords && plantMarkerOnMap) {
      map.jumpTo({ coords, zoom: (isMobile) ? [20] : [map.getZoom()] });

      const popup = new mapboxgl.Popup({
        className: 'addtree-popup',
        closeButton: false,
        closeOnClick: false,
      })
        .setHTML(isMobile ? '<h3>click me</h3>' : '<h3>move me</h3>')
        .addTo(map);
      const marker = new mapboxgl.Marker(createImageForMarker())
        .setLngLat(coords)
        .addTo(map)
        .setPopup(popup);

      currentMarkers.push(marker);
      marker.getElement().addEventListener('click',
        () => setShowAddTreeModal(!showAddTreeModal));

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setCoordinatesNewTree([lngLat.lng, lngLat.lat]);
      });
      const lngLat = marker.getLngLat();
      marker.on('dragend', lngLat);

      setCoordinatesNewTree([lngLat.lng, lngLat.lat]);
      marker.on('click', () => setShowAddTreeModal(!showAddTreeModal));
      map.off('click', handleAddMarker);
    }
  };

  useEffect(() => {
    if (!plantMarkerOnMap) return;
    if (geolocater._watchState === 'OFF') return;
    geolocater.on('geolocate', (position) => {
      const coordinates = [position.coords.longitude, position.coords.latitude];
      map.setCenter(coordinates);
      map.jumpTo({ coordinates, zoom: [20] });
      if (!plantMarkerOnMap) return;
      setCoordinatesNewTree(coordinates);
      handleAddMarker(null, coordinates);
      map.off('click', handleOnPlantClick);
    });
  }, [plantMarkerOnMap]);

  useEffect(() => {
    if (!plantMarkerOnMap) return;
    if (geolocater._watchState !== 'OFF') return;
    const lngLat = map.getCenter();
    handleAddMarker(null, lngLat, 12);
  }, [plantMarkerOnMap]);

  const handleMapClick = (event) => {
    if (!isMobile || !geolocater || geolocater._watchState === 'OFF') {
      const coordinates = event.lngLat;
      handleAddMarker(null, [coordinates.lng, coordinates.lat]);
    }
    map.off('click', handleMapClick);
  };

  useEffect(() => {
    if (plantMarkerOnMap) {
      map.on('click', handleMapClick);
    } else {
      map.off('click', handleMapClick);
    }
  }, [plantMarkerOnMap]);

  // renderCount += 1;
  // console.log(renderCount, 'renderCount');
  return (
    <div>
      <button
        data-tip={(plantMarkerOnMap) ? 'PLANTING' : ''}
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
          setPlantButtonText={setPlantButtonText}
          setCoordinatesNewTree={setCoordinatesNewTree}
          currentMarkers={currentMarkers}
          removeMarkers={removeMarkers}
        />
      )}

    </div>
  );
}
