import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import cx from 'clsx';
import {
  useQuery, useMutation, useQueryClient,
} from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';
import './TreeData.scss';
import { postData, getData } from '../../api/queries';
import TreeAdoptionDirections from './TreeAdoptionDirections';
import './TreeAdoptionLike.scss';

const treeImagesPath = 'assets/images/trees/';
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Checkbox color="default" {...props} />);

export default function AdoptLikeCheckboxes({
  idTree, common,
  mutateHistory,
}) {
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
          type: (event.target.checked) ? 'POST' : 'DELETE',
        },
      };

      mutateHistory.mutate(['treehistory', sendTreeHistory]);

      if (event.target.name === 'adopted') {
        mutateTreeAdoption.mutate(['treeadoption', sendTreeUser]);
        showAdoptionDirections(event.target.checked);
      }
      if (event.target.name === 'liked') mutateTreeLikes.mutate(['treelikes', sendTreeUser]);
    } catch (err) {
      console.error('CATCH', functionName, 'err', err);
    }
  };

  if (!user) return null;

  return (
    <React.Fragment>
      <div className="adoption-like">
        <Liked user={user} idTree={idTree} handleChange={handleChange} />
            <Adopted
              handleChange={handleChange}
              user={user}
              idTree={idTree}
              adoptionDirections={adoptionDirections}
              showAdoptionDirections={showAdoptionDirections}
            />
        </div>
        {adoptionDirections && <TreeAdoptionDirections common={common} />}
    </React.Fragment>
  );
}

function Liked({ handleChange, idTree, user }) {
  const treeLikes = useQuery(['treelikes', { idTree, email: user.email, request: 'liked' }], getData);
  const liked = treeLikes.data?.liked ?? false;
  const treeCount = useQuery(['treecount', { idTree, email: user.email, request: 'likes' }], getData);
  const likesCount = treeCount.data?.likesCount;

  return (
    <div className="adoption-like__item adoption-like__item--left">
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={<Favorite fontSize="large" />}
            checked={liked}
            onChange={handleChange}
            name="liked"
      />
        }
      />
      <span className="adoption-like__count">{likesCount}</span>
    </div>
  );
}

function Adopted({
  handleChange, user, idTree, adoptionDirections, showAdoptionDirections,
}) {
  const treeAdoption = useQuery(['treeadoption', { idTree, email: user.email, request: 'adopted' }], getData);
  const adopted = treeAdoption.data?.adopted ?? false;
  const treeCount = useQuery(['treecount', { idTree, email: user.email, request: 'adoption' }], getData);
  const adoptionCount = treeCount.data?.adoptionCount;

  return (
    <div className="adoption-like__item">
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
            checkedIcon={<CheckBoxIcon fontSize="large" />}
            checked={adopted}
            onChange={handleChange}
            name="adopted"
          />
        }
        label="Adopt"
        labelPlacement="start"
      />
      <span className="adoption-like__count">{adoptionCount}</span>
      <button
        className={cx('adoption-like__info-btn', {
          'adoption-like__info-btn--selected': adoptionDirections,
        })}
        type="button"
        onClick={() => showAdoptionDirections(!adoptionDirections)}
      >
        i
      </button>
    </div>
  );
}
