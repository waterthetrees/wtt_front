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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData } from '../../api/queries';
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
  const { data } = useLikesQuery({ idTree, email: user.email, request: 'liked' });
  const { liked, likedCount } = data;

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
  const AdoptionCheckbox = styled(Checkbox)({
    '&:hover': {
      backgroundColor: 'rgba(40, 167, 69, 0.06)',
    },
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#28a745',
      '&:hover': {
        backgroundColor: 'rgba(40, 167, 69, 0.06)',
      },
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
            {adoptedCount}
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
