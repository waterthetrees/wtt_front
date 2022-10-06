import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { TooltipBottom, TooltipTop } from '@/components/Tooltip';
import MapboxMarkerPortal from '@/pages/Map/MapboxMarkerPortal';
import { useUserLocation } from '@/pages/UserLocation/useUserLocation';
import { useNewTree } from './useNewTree';
import { targetSize, NewTreePlantingTarget } from './NewTreePlantingTarget';
import NewTreeOpenAddButton from './NewTreeOpenAddButton';

// Calculate the offset from the top-left of the marker to the center of the target.  Adding 1px
// seems to align the planted tree with the crosshairs better.
const markerOffset = targetSize / 2 + 1;
const markerOptions = {
  anchor: 'top-left',
  offset: [-markerOffset, -markerOffset],
  draggable: true,
};

const Container = styled(Box)`
  text-align: center;
`;

const Toolbar = styled(Box)`
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  justify-content: center;
`;

export function NewTreePlantingMarker({ map, onPlantClick }) {
  const [markerStartCoords, setMarkerStartCoords] = useState(null);
  const {
    newTreeState: { isPlanting, isFollowingUser },
    setCoords,
    endFollowingUser,
    beginDrag,
    endDrag,
  } = useNewTree();
  const {
    state: { coords, isTracking },
  } = useUserLocation();

  useEffect(() => {
    if (isPlanting) {
      const coordinates = coords && isFollowingUser ? coords : map.getCenter();

      // We store the starting coords for the marker in local state, so they change only when
      // isPlanting is toggled on.  If we passed newTreeState.coords to the marker, it would
      // redundantly update its location every time it's dragged, since setCoords() is called when
      // the drag ends.
      setMarkerStartCoords(coordinates);
      setCoords(coordinates);
      map.flyTo({ center: coordinates });
    }
  }, [isPlanting, map]);

  useEffect(() => {
    if (isPlanting && isFollowingUser && coords) {
      // Create a fresh object from the coords so that saving them to local state will trigger a
      // re-render of the marker.
      setMarkerStartCoords({ ...coords });
      setCoords(coords);
    }
  }, [isFollowingUser, coords]);

  // Turn off location tracking if the user starts dragging the marker so we're not snapping to the
  // current location.  Also tell the MapLayout to disable tree popups during the drag.
  const handleMarkerDragStart = () => {
    endFollowingUser();
    beginDrag();
  };

  // Update the coords with the marker's final location so that the new tree drawer will update to
  // show the new lng/lat if it's open, and re-enable tree popups.  We don't update the local marker
  // coords state because it's already at the correct location.
  const handleMarkerDragEnd = ({ target }) => {
    setCoords(target.getLngLat());
    endDrag();
  };

  return (
    <MapboxMarkerPortal
      map={map}
      visible={isPlanting}
      coordinates={markerStartCoords}
      options={markerOptions}
      className="planting-marker-container"
      onDragStart={handleMarkerDragStart}
      onDragEnd={handleMarkerDragEnd}
    >
      <Container>
        <TooltipTop title="Drag to the location for the new tree">
          <NewTreePlantingTarget
            // Only show the pulsing animation on the marker if geolocation tracking is also on.
            isFollowingUser={isFollowingUser && isTracking}
            onClick={onPlantClick}
          />
        </TooltipTop>
      </Container>
    </MapboxMarkerPortal>
  );
}
