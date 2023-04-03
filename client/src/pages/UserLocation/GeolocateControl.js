import React, { useEffect } from 'react';
import { IconButton, styled } from '@mui/material';
import { MyLocation, LocationSearching } from '@mui/icons-material';
import { useNewTree } from '@/pages/NewTree/useNewTree';
import { useUserLocation } from './useUserLocation';
import GeoMarker from './GeoMarker';

const iconStyle = `
  width: 100%;
  height: 100%;
  padding: 3px;
`;

const FollowingIcon = styled(MyLocation)(iconStyle);
const NotFollowingIcon = styled(LocationSearching)(iconStyle);

function GeolocateIcon({ isTracking, isFollowingUser }) {
  const color = isTracking ? 'primary' : 'inherit';

  // Show the target icon with no middle dot when tracking is enabled and the user has pulled the
  // planting marker away from the geolocation marker.
  return isTracking && !isFollowingUser ? (
    <NotFollowingIcon color={color} />
  ) : (
    <FollowingIcon color={color} />
  );
}

export default function GeolocateControl({ map }) {
  const {
    state: { coords, isTracking },
    beginTracking,
    endTracking,
  } = useUserLocation();
  const {
    newTreeState: { isPlanting, isFollowingUser },
    beginFollowingUser,
    endFollowingUser,
  } = useNewTree();

  useEffect(() => {
    if (isTracking && coords && map) {
      map.flyTo({ center: coords });
    }
  }, [isTracking, map]);

  const handleClick = () => {
    if (isTracking) {
      if (!isFollowingUser) {
        beginFollowingUser();
      } else {
        endTracking();
        endFollowingUser();
      }
    } else {
      beginTracking();
      beginFollowingUser();
    }
  };

  return (
    <>
      <IconButton title="Find Your Location" onClick={handleClick} style={{ color: '#333' }}>
        <GeolocateIcon
          isTracking={isTracking}
          isFollowingUser={isFollowingUser}
        />
      </IconButton>
      <GeoMarker
        map={map}
        visible={isTracking && (!isPlanting || !isFollowingUser)}
        coordinates={coords}
      />
    </>
  );
}
