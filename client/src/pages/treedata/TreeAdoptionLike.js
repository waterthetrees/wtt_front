import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import format from 'date-fns/format';
import React, { useState } from 'react';
import {
  useTreeAdoptionsQuery, useTreeLikesQuery, useTreeAdoptionsMutation,
  useTreeHistoryMutation, useTreeLikesMutation,
} from '../../api/queries';
import StarCheckbox from '../../components/Checkbox/StarCheckbox/StarCheckbox';
import AdoptionInfoIconButton from '../../components/IconButtons/AdoptionInfoIconButton/AdoptionInfoIconButton';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import TreeAdoptionDirections from './TreeAdoptionDirections';

function Liked({ handleChange, idTree, user }) {
  const { data: { liked, likedCount } } = useTreeLikesQuery({ idTree, email: user.email });

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <Tooltip title={<div style={{ fontSize: '1.125rem' }}>Like</div>} placement="top" arrow>
            <StarCheckbox
              name="liked"
              edge="start"
              checked={liked}
              icon={<StarBorderIcon fontSize="large" />}
              checkedIcon={<StarIcon fontSize="large" />}
              onChange={handleChange}
            />
          </Tooltip>
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
          <Tooltip title={<div style={{ fontSize: '1.125rem' }}>Adopt</div>} placement="top" arrow>
            <Checkbox
              name="adopted"
              checked={adopted}
              icon={<AdoptionIcon fontSize="large" />}
              checkedIcon={<AdoptionIcon fontSize="large" primary />}
              onChange={handleChange}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Box fontSize="1.125rem">{adoptedCount}</Box>
        </Grid>
        <Grid item>
          <AdoptionInfoIconButton
            edge="end"
            adoptionDirections={adoptionDirections}
            onClick={() => showAdoptionDirections(!adoptionDirections)}
          >
            <InfoIcon fontSize="large" />
          </AdoptionInfoIconButton>
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
