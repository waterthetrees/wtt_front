import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { styled, ToggleButton } from '@mui/material';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { useCreateTreeDataMutation, useUserMutation } from '@/api/queries';
import PlusIconPath from '@/assets/images/addtree/plus2.svg';
import { useUserLocation } from '@/pages/map/UserLocation/useUserLocation';
import { useNewTree } from './useNewTree';
import { useIsMobile } from './utilities';
import { PlantingMarker } from './PlantingMarker';

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
  const mutateUser = useUserMutation();
  const mutateTreeData = useCreateTreeDataMutation();
  const {
    newTreeState: { isPlanting, isFollowingUser, result }, openPanel, beginPlanting, endPlanting,
  } = useNewTree();
  const { beginTracking } = useUserLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (result) {
      // The user clicked the Add Tree button in the panel, so post the tree form to create a new
      // tree, reset the form data, and then hide the planting marker.
      mutateTreeData.mutate(result);
      endPlanting();
    }
  }, [result]);

  const handlePlantClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      mutateUser.mutate(user);
    }

    if (isPlanting) {
      // The user just toggled off planting mode, so close the new tree drawer if it's open.
      endPlanting();
    } else {
      if (isMobile && isFollowingUser) {
        beginTracking();
      }

      beginPlanting();
    }
  };

  return (
    <>
      <PlantButton
        value="Plant"
        selected={isPlanting}
        onChange={handlePlantClick}
      />
      <PlantingMarker
        map={map}
        onPlantClick={openPanel}
      />
    </>
  );
}
