import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import Button from '@material-ui/core/Button';
import cx from 'classnames';
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
  const treeAdoption = useQuery(['treeadoption', { idTree, email: user.email, request: 'adopted' }], getData);
  const treeLikes = useQuery(['treelikes', { idTree, email: user.email, request: 'liked' }], getData);
  const infoImage = `${treeImagesPath}info.svg`;

  const { adopted } = treeAdoption.data || {};
  const { liked } = treeLikes.data || {};

  const queryClient = useQueryClient();
  const mutateTreeLikes = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treelikes');
      queryClient.invalidateQueries('treehistory');
    },
  });
  const mutateTreeAdoption = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treeadoption');
      queryClient.invalidateQueries('treehistory');
    },
  });
  const [adoptionDirections, showAdoptionDirections] = React.useState(false);

  const handleChange = async (event) => {
    const functionName = 'handleadoptTree';

    try {
      if (!isAuthenticated) loginWithRedirect();
      // setState({ ...state, [event.target.name]: event.target.checked });
      if (event.target.name === 'adopted' && adopted === event.target.checked) return;
      if (event.target.name === 'liked' && liked === event.target.checked) return;
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const sendTreeHistory = {
        idTree,
        dateVisit,
        comment: `${common} Adoption by ${user.nickname}`,
        volunteer: user.nickname,
      };

      // console.log('sendTreeHistory', sendTreeHistory);
      const sendTreeUser = {
        idTree,
        common,
        nickname: user.nickname,
        email: user.email,
        request: {
          [event.target.name]: event.target.checked,
          name: event.target.name,
          type: (event.target.checked) ? 'POST' : 'DELETE',
        },
      };

      if (event.target.checked) mutateHistory.mutate(['treehistory', sendTreeHistory]);
      if (event.target.name === 'adopted') {
        mutateTreeAdoption.mutate(['treeadoption', sendTreeUser]);
        if (event.target.checked === true) showAdoptionDirections(event.target.checked);
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
          <Liked liked={liked} treeLikes={treeLikes} handleChange={handleChange} />
        </div>

        <div>
          {treeAdoption && treeAdoption.isFetched && (
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
              </span>
            </label>
          )}

          <button
            className={cx('infobutton', (adoptionDirections) ? 'infobutton-selected' : '')}
            type="button"
            onClick={() => showAdoptionDirections(!adoptionDirections)}
          >
            i
          </button>
        </div>
      </div>
      <div>
        {adoptionDirections && <TreeAdoptionDirections common={common} />}
      </div>

    </div>
  );
}

function Liked({ treeLikes, handleChange, liked }) {
  return (
    <div className="text-center heart">
      {treeLikes && treeLikes.isFetched && (
        <FormControlLabel
          className="adopt"
          control={(<Checkbox checked={liked} icon={<FavoriteBorder fontSize="large" />} onChange={handleChange} checkedIcon={<Favorite fontSize="large" />} name="liked" />)}
          label=""
        />
      )}
    </div>
  );
}
