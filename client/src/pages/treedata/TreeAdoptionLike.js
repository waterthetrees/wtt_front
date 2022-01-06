import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid } from '@mui/material';
import format from 'date-fns/format';
import {
  useTreeAdoptionsQuery, useTreeLikesQuery, useTreeAdoptionsMutation,
  useTreeHistoryMutation, useTreeLikesMutation,
} from '@/api/queries';
import { AdoptionCheckbox, InfoCheckbox, StarCheckbox } from '@/components/Checkbox';
import { TooltipTop } from "../../components/Tooltip";

import TreeAdoptionDirections from './TreeAdoptionDirections';

function Liked({ handleChange, idTree, user }) {
  const { data: { liked, likedCount } } = useTreeLikesQuery({ idTree, email: user.email });

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <TooltipTop title="Like">
            <StarCheckbox
              name="liked"
              checked={liked}
              onChange={handleChange}
            />
          </TooltipTop>
        </Grid>
        <Box fontSize="1.125rem">{likedCount}</Box>
      </Grid>
    </Grid>
  );
}

function Adopted({
  handleChange, user, idTree, adoptionDirections, showAdoptionDirections,
}) {
  const { data: { adopted, adoptedCount } } = useTreeAdoptionsQuery({ idTree, email: user.email });

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <TooltipTop title="Adopt">
            <AdoptionCheckbox
              name="adopted"
              checked={adopted}
              onChange={handleChange}
            />
          </TooltipTop>
        </Grid>
        <Box fontSize="1.125rem">{adoptedCount}</Box>
        <Grid item>
          <InfoCheckbox
            checked={adoptionDirections}
            onClick={() => showAdoptionDirections(!adoptionDirections)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function AdoptLikeCheckboxes({ idTree, common }) {
  const { user } = useAuth0();
  const mutateTreeLikes = useTreeLikesMutation();
  const mutateTreeAdoptions = useTreeAdoptionsMutation();
  const mutateHistory = useTreeHistoryMutation();
  const [adoptionDirections, showAdoptionDirections] = useState(false);

  const handleChange = (event) => {
    const sendTreeHistory = {
      idTree,
      dateVisit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      [event.target.name]: event.target.checked,
      volunteer: user.nickname,
    };
    const sendTreeUser = {
      idTree,
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
      showAdoptionDirections(event.target.checked);
    } else {
      mutateTreeLikes.mutate(sendTreeUser);
    }

    mutateHistory.mutate(sendTreeHistory);
  };

  if (!user) return null;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Liked
          idTree={idTree}
          user={user}
          handleChange={handleChange}
        />
        <Adopted
          idTree={idTree}
          user={user}
          adoptionDirections={adoptionDirections}
          showAdoptionDirections={showAdoptionDirections}
          handleChange={handleChange}
        />
      </Grid>
      {adoptionDirections && <TreeAdoptionDirections />}
    </>
  );
}
