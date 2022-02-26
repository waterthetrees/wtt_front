import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { styled, ToggleButton } from '@mui/material';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { useCreateTreeDataMutation, useUserMutation } from '@/api/queries';
import { MapboxMarkerPortal } from '@/pages/map/Map/MapboxMarkerPortal';
import PlusIconPath from '@/assets/images/addtree/plus2.svg';
import { isMobile } from './utilities';
import { useNewTree } from './useNewTree';
import { useGeolocation } from './useGeolocation';
import Marker from './Marker';

const markerOptions = {
  anchor: 'top-left',
  offset: [-35, -35],
  draggable: true,
};

const PlantButton = styled(ToggleButton)`
  color: white;
  font-size: 1.3rem;
  width: 5rem !important;
  height: 5rem !important;
  border: none;
  background-color: #147d16;
  background-image: url(${PlusIconPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 97%;

  &::after {
    content: 'PLANT';
  }

  &.Mui-selected {
    font-size: .9rem;
    color: white;
    background-color: transparent;

    &::after {
      content: 'PLANTING';
    }
  }
`;

export default function NewTree({ map }) {
  const { user, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [tracking, setTracking] = useState(isMobile);
  const [markerStartCoords, setMarkerStartCoords] = useState(null);
  const mutateUser = useUserMutation();
  const mutateTreeData = useCreateTreeDataMutation();
  const {
    newTreeState, setCoords, openPanel, beginPlanting, endPlanting, beginDrag, endDrag,
  } = useNewTree();
  const geo = useGeolocation({
    // Don't request location permission until the user clicks Plant.
    enabled: newTreeState.isPlanting && tracking,
    // Only update the position as the user moves if tracking is on.
    watching: newTreeState.isPlanting && tracking,
    timeout: 15000,
    enableHighAccuracy: true,
  });

  useEffect(() => {
    if (newTreeState.isPlanting) {
      const coordinates = geo.data && tracking
        ? { lng: geo.data.coords.longitude, lat: geo.data.coords.latitude }
        : map.getCenter();

      // We store the starting coords for the marker in state, so they change only when planting is
      // toggled on.  If we passed newTreeState.coords to the marker, it would redundantly update
      // its location every time it's dragged, since setCoords() is called when the drag ends.
      setMarkerStartCoords(coordinates);
      setCoords(coordinates);
      map.flyTo({ center: coordinates });
    }
    // This effect should only listen for changes on geo.data, as the overall geo result object is
    // recreated on each call and listening for it would cause an infinite loop.
  }, [newTreeState.isPlanting, geo.data, map]);

  useEffect(() => {
    if (newTreeState.result) {
      // The user clicked the Add Tree button in the panel, so post the tree form to create a new
      // tree, reset the form data, and then hide the planting marker.
      mutateTreeData.mutate(newTreeState.result);
      endPlanting();
    }
  }, [newTreeState.result]);

  // Turn off location tracking if the user starts dragging the marker so we're not snapping to the
  // current location.  Also tell the MapLayout to disable tree popups during the drag.
  const handleMarkerDragStart = () => {
    setTracking(false);
    beginDrag();
  };

  // Update the coords with the marker's final location so that the new tree drawer will update to
  // show the new lng/lat if it's open, and re-enable tree popups.
  const handleMarkerDragEnd = ({ target }) => {
    setCoords(target.getLngLat());
    endDrag();
  };

  const handlePlantClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      mutateUser.mutate(user);
    }

    if (newTreeState.isPlanting) {
      // The user just toggled off planting mode, so close the new tree drawer if it's open.
      endPlanting();
    } else {
      beginPlanting();
    }
  };

  const handleTrackingChange = (event) => setTracking(event.target.checked);

  return (
    <>
      <PlantButton
        value="Plant"
        selected={newTreeState.isPlanting}
        onChange={handlePlantClick}
      />
      <MapboxMarkerPortal
        map={map}
        visible={newTreeState.isPlanting}
        coordinates={markerStartCoords}
        options={markerOptions}
        onDragStart={handleMarkerDragStart}
        onDragEnd={handleMarkerDragEnd}
      >
        <Marker
          tracking={tracking}
          onPlantClick={openPanel}
          onTrackingChange={handleTrackingChange}
        />
      </MapboxMarkerPortal>
    </>
  );
}
