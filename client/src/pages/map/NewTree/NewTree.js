import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import mapboxgl from 'mapbox-gl';
import cx from 'clsx';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { useCreateTreeDataMutation, useUserMutation } from '@/api/queries';
import { isMobile } from './utilities';
import { useNewTree } from './useNewTree';
import './NewTree.scss';

let currentMarker = null;

const createImageForMarker = () => {
  const sproutImg = document.createElement('img');
  sproutImg.src = 'assets/images/addtree/tree12.svg';
  sproutImg.alt = 'sprout-marker';

  return {
    element: sproutImg,
    draggable: true,
    scale: 0.003,
  };
};

export default function NewTree({ map, geolocater }) {
  const { user, isAuthenticated } = useAuth0();
  const mutateUser = useUserMutation();
  const { loginToCurrentPage } = useAuthUtils();
  const [plantMarkerOnMap, setPlantMarkerOnMap] = useState(false);
  const [coords, setCoords] = useState(null);
  const [plantButtonText, setPlantButtonText] = useState('PLANT');
  const mutateTreeData = useCreateTreeDataMutation();
  const {
    newTreeState, setCoords: setNewTreeCoords, openPanel, cancel, reset,
  } = useNewTree();

  const openNewTreePanel = () => openPanel();

  const removeMarker = () => { currentMarker.remove(); currentMarker = null; };

  const removeAddGeolocater = () => {
    // remove geolocator so it doesnt go to watch mode
    geolocater.onRemove();
    // add geolocator control back on map seems hacky but works
    // would be nicer to just turn off watch mode
    map.addControl(geolocater);
  };

  useEffect(() => {
    if (plantMarkerOnMap) return;
    if (currentMarker) removeMarker();
    // _watchState will be undefined until the control has been added, and we want to avoid adding
    // it again before the add has completed, as that will cause two controls to appear.
    if (typeof geolocater._watchState === 'string' && geolocater._watchState !== 'OFF') removeAddGeolocater();
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
      cancel();
    }

    setPlantMarkerOnMap(!plantMarkerOnMap);
    if (event.target.innerText !== 'PLANT' && geolocater._watchState !== 'OFF') removeAddGeolocater();
  };

  const handleAddMarker = (event, coordinates) => {
    if (event) event.preventDefault();
    if (!plantMarkerOnMap) return;
    const coords = coords || coordinates;
    // if theres already a marker on the map, don't add more!
    if (currentMarker) return;

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

      currentMarker = marker;
      marker.getElement().addEventListener('click', openNewTreePanel);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        const newCoords = [lngLat.lng, lngLat.lat];

        setCoords(newCoords);
        setNewTreeCoords(newCoords);
      });

      const lngLat = marker.getLngLat();
      const newCoords = [lngLat.lng, lngLat.lat];

// TODO: clean up this repetition, only store one copy of the coords?
      setCoords(newCoords);
      setNewTreeCoords(newCoords);

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
      setCoords(coordinates);
      handleAddMarker(null, coordinates);
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

  useEffect(() => {
    if (newTreeState.result) {
      mutateTreeData.mutate(newTreeState.result);
      reset();
      setPlantMarkerOnMap(false);
      setPlantButtonText('PLANT');
      setCoords(null);
    }
  }, [newTreeState.result]);

  return (
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
  );
}
