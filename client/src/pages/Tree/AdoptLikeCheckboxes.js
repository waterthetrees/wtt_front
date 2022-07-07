import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid, Link } from '@mui/material';
import format from 'date-fns/format';
import {
  useTreeAdoptionsQuery, useTreeLikesQuery, useTreeAdoptionsMutation,
  useTreeHistoryMutation, useTreeLikesMutation,
  useCreateTreeDataMutation,
} from '@/api/queries';
import { AdoptionCheckbox, InfoCheckbox, StarCheckbox } from '@/components/Checkbox';
import { TooltipTop } from '@/components/Tooltip';
import AdoptionDirections from '@/pages/Adopt/AdoptionDirections';
import { useDebouncedCallback } from 'use-debounce';

function Liked({ handleChange, currentTreeId, user }) {
  const { data: { liked, likedCount } } = useTreeLikesQuery({
    id: currentTreeId,
    email: user.email,
  });

  return (
    <Grid item sx={{ mr: 1 }}>
      <Grid container alignItems="center">
        <TooltipTop title="Like">
          <StarCheckbox
            edge="start"
            name="liked"
            checked={liked}
            onChange={handleChange}
          />
        </TooltipTop>
        <Box fontSize="1.125rem">{likedCount}</Box>
      </Grid>
    </Grid>
  );
}

function Adopted({
  handleChange, user, currentTreeId, directions, showDirections,
}) {
  const { data: { adopted, adoptedCount } } = useTreeAdoptionsQuery({
    id: currentTreeId,
    email: user.email,
  });

  return (
    <Grid item>
      <Grid container alignItems="center">
        <TooltipTop title="Adopt">
          <AdoptionCheckbox
            name="adopted"
            checked={adopted}
            onChange={handleChange}
          />
        </TooltipTop>
        <Box sx={{ fontSize: '1.125rem', mr: 1 }}>{adoptedCount}</Box>
        <InfoCheckbox
          checked={directions}
          onClick={() => showDirections(!directions)}
        />
      </Grid>
    </Grid>
  );
}

export default function AdoptLikeCheckboxes({
  currentTreeData, edit, isTreeQueryError,
}) {
  const { user } = useAuth0();
  const mutateTreeLikes = useTreeLikesMutation();
  const mutateTreeAdoptions = useTreeAdoptionsMutation();
  const mutateHistory = useTreeHistoryMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();
  const [directions, showDirections] = useState(false);

  const handleChange = (event) => {
    if (isTreeQueryError) {
      mutateCreateTreeData.mutate({
        ...currentTreeData,
        scientific: currentTreeData.scientific
        || currentTreeData.genus,
        city: currentTreeData.city || currentTreeData.sourceId,
        volunteer: user.nickname,
        health: currentTreeData.health || 'fair',
      });
    }

    const sendTreeHistory = {
      id: currentTreeData.id,
      dateVisit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      [event.target.name]: event.target.checked,
      volunteer: user.nickname,
    };
    const sendTreeUser = {
      id: currentTreeData.id,
      common: currentTreeData.common,
      nickname: user.nickname,
      email: user.email,
      request: {
        name: event.target.name,
        type: event.target.checked ? 'POST' : 'DELETE',
      },
    };

    if (event.target.name === 'adopted') {
      setTimeout(() => {
        mutateTreeAdoptions.mutate(sendTreeUser);
        mutateHistory.mutate(sendTreeHistory);
      }, 500);
      showDirections(event.target.checked);
    }
    if (event.target.name === 'liked') {
      setTimeout(() => {
        mutateTreeLikes.mutate(sendTreeUser);
        mutateHistory.mutate(sendTreeHistory);
      }, 500);
    }
  };

  if (!user) return null;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" flexWrap="initial">
        <Grid container>
          <Liked
            currentTreeId={currentTreeData.id}
            user={user}
            handleChange={handleChange}
          />
          <Adopted
            currentTreeId={currentTreeData.id}
            user={user}
            directions={directions}
            showDirections={showDirections}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
      {directions && (
        <AdoptionDirections
          open={directions}
          onClose={() => showDirections(false)}
        />
      )}
    </>
  );
}
