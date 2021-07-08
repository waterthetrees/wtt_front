import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import InfoIcon from '@material-ui/icons/Info';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { postData, getData } from '../../api/queries';
import TreeAdoptionDirections from './TreeAdoptionDirections';

export default function AdoptLikeCheckboxes({ idTree, common, mutateHistory }) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const queryClient = useQueryClient();
  const mutateTreeLikes = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treecount');
      queryClient.invalidateQueries('treelikes');
      queryClient.invalidateQueries('treehistory');
    },
  });
  const mutateTreeAdoption = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treecount');
      queryClient.invalidateQueries('treeadoption');
      queryClient.invalidateQueries('treehistory');
    },
  });
  const [adoptionDirections, showAdoptionDirections] = useState(false);

  const handleChange = async (event) => {
    const functionName = 'handleadoptTree';

    try {
      if (!isAuthenticated) loginWithRedirect();

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
        volunteer: user.volunteer,
        email: user.email,
        request: {
          [event.target.name]: event.target.checked,
          name: event.target.name,
          type: event.target.checked ? 'POST' : 'DELETE',
        },
      };

      mutateHistory.mutate(['treehistory', sendTreeHistory]);

      if (event.target.name === 'adopted') {
        mutateTreeAdoption.mutate(['treeadoption', sendTreeUser]);
        showAdoptionDirections(event.target.checked);
      } else {
        mutateTreeLikes.mutate(['treelikes', sendTreeUser]);
      }
    } catch (err) {
      console.error('CATCH', functionName, 'err', err);
    }
  };

  if (!user) return null;

  return (
    <>
      <Grid container alignItems="center" justify="space-between">
        <Liked user={user} idTree={idTree} handleChange={handleChange} />
        <Adopted
          handleChange={handleChange}
          user={user}
          idTree={idTree}
          adoptionDirections={adoptionDirections}
          showAdoptionDirections={showAdoptionDirections}
        />
      </Grid>
      {adoptionDirections && <TreeAdoptionDirections common={common} />}
    </>
  );
}

function Liked({ handleChange, idTree, user }) {
  const treeLikes = useQuery(
    ['treelikes', { idTree, email: user.email, request: 'liked' }],
    getData,
  );
  const liked = treeLikes.data?.liked ?? false;
  const treeCount = useQuery(
    ['treecount', { idTree, email: user.email, request: 'likes' }],
    getData,
  );
  const likesCount = treeCount.data?.likesCount;

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <Checkbox
            edge="start"
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={<Favorite fontSize="large" />}
            checked={liked}
            onChange={handleChange}
            name="liked"
          />
        </Grid>
        <Box fontSize="1.125rem">{likesCount}</Box>
      </Grid>
    </Grid>
  );
}

function Adopted({
  handleChange, user, idTree, adoptionDirections, showAdoptionDirections,
}) {
  const treeAdoption = useQuery(
    ['treeadoption', { idTree, email: user.email, request: 'adopted' }],
    getData,
  );
  const adopted = treeAdoption.data?.adopted ?? false;
  const treeCount = useQuery(
    ['treecount', { idTree, email: user.email, request: 'adoption' }],
    getData,
  );
  const adoptionCount = treeCount.data?.adoptionCount;
  const AdoptionCheckbox = styled(Checkbox)({
    '&:hover': {
      backgroundColor: 'rgba(40, 167, 69, 0.06)',
    },
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#28a745',
    },
    '&.MuiCheckbox-colorSecondary.Mui-checked:hover': {
      backgroundColor: 'rgba(40, 167, 69, 0.06)',
    },
  });
  const AdoptionIconButton = styled(IconButton)({
    padding: '9px',
    '&:hover': {
      backgroundColor: 'rgba(40, 167, 69, 0.06)',
    },
    color: adoptionDirections ? '#28a745' : '',
  });

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item>
          <FormControlLabel
            control={(
              <AdoptionCheckbox
                checked={adopted}
                onChange={handleChange}
                name="adopted"
                icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                checkedIcon={<CheckBoxIcon fontSize="large" />}
              />
            )}
            label="Adopt"
            labelPlacement="start"
          />
        </Grid>
        <Grid item>
          <Box fontSize="1.125rem" marginLeft="1em">
            {adoptionCount}
          </Box>
        </Grid>
        <Grid item>
          <AdoptionIconButton
            edge="end"
            onClick={() => showAdoptionDirections(!adoptionDirections)}
          >
            <InfoIcon fontSize="large" />
          </AdoptionIconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
