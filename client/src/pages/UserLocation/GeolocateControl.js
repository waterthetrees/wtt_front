import { LocationSearching, MyLocation } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import React, { useContext, useEffect } from 'react';

import { MapboxManagerContext } from '@/pages/Map/MapboxManagerProvider';
import { useNewTree } from '@/pages/NewTree/useNewTree';

import { REGION_TYPES } from '../../util/constants';
import GeoMarker from './GeoMarker';
import { useUserLocation } from './useUserLocation';

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

export default function GeolocateControl() {
  const {
    state: { coords, isTracking },
    beginTracking,
    endTracking,
    getCurrentPosition,
  } = useUserLocation();
  const {
    newTreeState: { isPlanting, isFollowingUser },
    beginFollowingUser,
    endFollowingUser,
  } = useNewTree();
  const mapboxManager = useContext(MapboxManagerContext);

  useEffect(() => {
    if (isFollowingUser && coords) {
      mapboxManager.setCenter({ coords, regionType: REGION_TYPES.LATLONG });
    }
  }, [isFollowingUser, coords, mapboxManager]);

  const handleClick = async () => {
    if (isTracking) {
      if (!isFollowingUser) {
        beginFollowingUser();
      } else {
        endTracking();
        endFollowingUser();
      }
    } else {
      const {
        coords: { longitude: lng, latitude: lat },
      } = await getCurrentPosition();
      mapboxManager.setCenter({
        coords: { lng, lat },
        regionType: REGION_TYPES.LATLONG,
      });
      beginTracking();
      beginFollowingUser();
    }
  };

  return (
    <>
      <IconButton
        title="Find Your Location"
        onClick={handleClick}
        style={{ color: '#333' }}
      >
        <GeolocateIcon
          isTracking={isTracking}
          isFollowingUser={isFollowingUser}
        />
      </IconButton>
      <GeoMarker
        visible={isTracking && (!isPlanting || !isFollowingUser)}
        coordinates={coords}
      />
    </>
  );
}
