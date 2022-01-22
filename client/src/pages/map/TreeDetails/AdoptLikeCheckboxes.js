import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid, Link } from '@mui/material';
import format from 'date-fns/format';
import {
  useTreeAdoptionsQuery, useTreeLikesQuery, useTreeAdoptionsMutation,
  useTreeHistoryMutation, useTreeLikesMutation,
} from '@/api/queries';
import { AdoptionCheckbox, InfoCheckbox, StarCheckbox } from '@/components/Checkbox';
import { TooltipTop } from '@/components/Tooltip';
import AdoptionDirections from '@/pages/map/Adopt/AdoptionDirections';

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

export default function AdoptLikeCheckboxes({ currentTreeId, common, edit }) {
  const { user } = useAuth0();
  const mutateTreeLikes = useTreeLikesMutation();
  const mutateTreeAdoptions = useTreeAdoptionsMutation();
  const mutateHistory = useTreeHistoryMutation();
  const [directions, showDirections] = useState(false);

  const handleChange = (event) => {
    const sendTreeHistory = {
      id: currentTreeId,
      dateVisit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      [event.target.name]: event.target.checked,
      volunteer: user.nickname,
    };
    const sendTreeUser = {
      id: currentTreeId,
      common,
      nickname: user.nickname,
      email: user.email,
      request: {
        name: event.target.name,
        type: event.target.checked ? 'POST' : 'DELETE',
      },
    };

    if (event.target.name === 'adopted') {
      mutateTreeAdoptions.mutate(sendTreeUser);
      showDirections(event.target.checked);
    } else {
      mutateTreeLikes.mutate(sendTreeUser);
    }

    mutateHistory.mutate(sendTreeHistory);
  };

  if (!user) return null;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" flexWrap="initial">
        <Grid container>
          <Liked
            currentTreeId={currentTreeId}
            user={user}
            handleChange={handleChange}
          />
          <Adopted
            currentTreeId={currentTreeId}
            user={user}
            directions={directions}
            showDirections={showDirections}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Link
            component="button"
            onClick={edit}
            sx={{
              m: 1,
              textDecoration: 'none',
              fontSize: '1em',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            EDIT
          </Link>
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
