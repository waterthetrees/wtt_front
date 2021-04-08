import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import {
  useQuery, useMutation, useQueryClient,
} from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';
import './TreeData.scss';
import { postData, getData } from '../../api/queries';
import TreeAdoptionDirections from './TreeAdoptionDirections';

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
        date_visit: dateVisit,
        comment: `${common} was adopted by ${user.nickname}`,
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
    <div className="text-center">

      <FormGroup row>
        {treeLikes && treeLikes.isFetched && (
          <FormControlLabel
            className="adopt__label"
            control={(<Checkbox checked={liked} icon={<FavoriteBorder />} onChange={handleChange} checkedIcon={<Favorite />} name="liked" />)}
            label="Like"
          />
        )}
        {treeAdoption && treeAdoption.isFetched && (
          <FormControlLabel
            className="adopt__label"
            control={<GreenCheckbox checked={adopted} onChange={handleChange} name="adopted" />}
            label="Adopt"
          />
        )}
        <Button color="default" onClick={() => showAdoptionDirections(!adoptionDirections)}>
          (HowTo)
        </Button>
        {adoptionDirections && <TreeAdoptionDirections common={common} />}
      </FormGroup>

    </div>
  );
}
