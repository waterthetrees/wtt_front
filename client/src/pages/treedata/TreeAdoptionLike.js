import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData } from '../../api/queries';
import StarCheckbox from '../../components/Checkbox/StarCheckbox/StarCheckbox';
import AdoptionInfoIconButton from '../../components/IconButtons/AdoptionInfoIconButton/AdoptionInfoIconButton';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import TreeAdoptionDirections from './TreeAdoptionDirections';

export const useLikesQuery = (obj) => useQuery(['treelikes', obj], getData, {
  placeholderData: {
    liked: false,
    likedCount: 0,
  },
});

export const useAdoptionQuery = (obj) => useQuery(['treeadoption', obj], getData, {
  placeholderData: {
    adopted: false,
    adoptedCount: 0,
  },
});

export const useLikesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treelikes');
      queryClient.invalidateQueries('treehistory');
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useAdoptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treeadoption');
      queryClient.invalidateQueries('treehistory');
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export default function AdoptLikeCheckboxes({ idTree, common, mutateHistory }) {
  const { user } = useAuth0();
  const mutateTreeLikes = useLikesMutation();
  const mutateTreeAdoption = useAdoptionMutation();
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
        // [event.target.name]: event.target.checked,
        name: event.target.name,
        type: event.target.checked ? 'POST' : 'DELETE',
      },
    };

    if (event.target.name === 'adopted') {
      mutateTreeAdoption.mutate(['treeadoption', sendTreeUser]);
      showAdoptionDirections(event.target.checked);
    } else {
      mutateTreeLikes.mutate(['treelikes', sendTreeUser]);
    }

    mutateHistory.mutate(['treehistory', sendTreeHistory]);
  };

  if (!user) return null;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Liked user={user} idTree={idTree} handleChange={handleChange} />
        <Adopted
          handleChange={handleChange}
          user={user}
          idTree={idTree}
          adoptionDirections={adoptionDirections}
          showAdoptionDirections={showAdoptionDirections}
        />
      </Grid>
      {adoptionDirections && <TreeAdoptionDirections />}
    </>
  );
}

function Liked({ handleChange, idTree, user }) {
  const { data } = useLikesQuery({ idTree, email: user.email, request: 'liked' });
  const { liked, likedCount } = data;

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <Tooltip title={<div style={{ fontSize: '1.125rem' }}>Like</div>} placement="top" arrow>
            <StarCheckbox
              edge="start"
              icon={<StarBorderIcon fontSize="large" />}
              checkedIcon={<StarIcon fontSize="large" />}
              checked={liked}
              onChange={handleChange}
              name="liked"
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
  const { data } = useAdoptionQuery({ idTree, email: user.email, request: 'adopted' });
  const { adopted, adoptedCount } = data;

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <Tooltip title={<div style={{ fontSize: '1.125rem' }}>Adopt</div>} placement="top" arrow>
            <Checkbox
              icon={<AdoptionIcon fontSize="large" />}
              checkedIcon={<AdoptionIcon fontSize="large" primary />}
              checked={adopted}
              onChange={handleChange}
              name="adopted"
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Box fontSize="1.125rem">{adoptedCount}</Box>
        </Grid>
        <Grid item>
          <AdoptionInfoIconButton
            adoptionDirections={adoptionDirections}
            edge="end"
            onClick={() => showAdoptionDirections(!adoptionDirections)}
          >
            <InfoIcon fontSize="large" />
          </AdoptionInfoIconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
