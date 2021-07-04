import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

  return (
    <div>
      <div className="adoption">

        <div>
          {user && (<Liked user={user} idTree={idTree} handleChange={handleChange} />)}
        </div>

        <div>
          {user && (
            <Adopted
              handleChange={handleChange}
              user={user}
              idTree={idTree}
              adoptionDirections={adoptionDirections}
              showAdoptionDirections={showAdoptionDirections}
            />
          )}
        </div>
      </div>
      <div>
        {adoptionDirections && <TreeAdoptionDirections common={common} />}
      </div>

    </div>
  );
}

function Liked({ handleChange, idTree, user }) {
  const treeLikes = useQuery(['treelikes', { idTree, email: user.email, request: 'liked' }], getData);
  const liked = treeLikes.data?.liked ?? false;
  const treeCount = useQuery(['treecount', { idTree, email: user.email, request: 'likes' }], getData);
  const likesCount = treeCount.data?.likesCount;

  return (
    <div className="text-center heart">
      <FormControlLabel
        className="adopt"
        control={(<Checkbox checked={liked} icon={<FavoriteBorder fontSize="large" />} onChange={handleChange} checkedIcon={<Favorite fontSize="large" />} name="liked" />)}
        label=""
      />
      {likesCount}
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
    <div>
      <label
        className="adopt"
        htmlFor="adopted"
      >
        <span>
          Adopt
          <input
            type="checkbox"
            id="adopted"
            onChange={handleChange}
            checked={adopted}
            name="adopted"
            className="adopt"
          />
          {adoptionCount}
        </span>
      </label>

      <button
        className={cx('infobutton', (adoptionDirections) ? 'infobutton-selected' : '')}
        type="button"
        onClick={() => showAdoptionDirections(!adoptionDirections)}
      >
        i
      </button>
    </div>
  );
}
