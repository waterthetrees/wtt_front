import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import UserTreeHistoryTable from '../../components/UserTreeHistoryTable/UserTreeHistoryTable';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import TreeIcon from '../../assets/images/addtree/tree12.svg';
import Footer from '../../components/Footer/Footer';
import './UserProfile.scss';

function UserProfile() {
  const StyledAvatar = styled(Avatar)({
    height: '6em',
    width: '6em',
  });

  const { user } = useAuth0();

  const email = user?.email;

  const userAdoptedTrees = useQuery(['usercounts', { request: 'adopted', email }], getData, {
    enabled: !!email,
  });

  const userAdoptedTreesHistory = userAdoptedTrees?.data;

  const userLikedTrees = useQuery(['usercounts', { request: 'liked', email }], getData, {
    enabled: !!email,
  });

  const userLikedTreesHistory = userLikedTrees?.data;

  const userPlantedTrees = useQuery(['usercounts', { request: 'planted', email }], getData, {
    enabled: !!email,
  });

  const userPlantedTreesHistory = userPlantedTrees?.data;

  const UserProfile = {
    UserEmail: user?.email,
    UserImageURL: user?.picture,
    UserName: user?.name,
    UserNickname: user?.nickname,
    treeListAdopted: userAdoptedTreesHistory
      ? Object.keys(userAdoptedTreesHistory).map((index) => userAdoptedTreesHistory[index])
      : [],
    treeListLiked: userLikedTreesHistory
      ? Object.keys(userLikedTreesHistory).map((index) => userLikedTreesHistory[index])
      : [],
    treeListPlanted: userPlantedTreesHistory
      ? Object.keys(userPlantedTreesHistory).map((index) => userPlantedTreesHistory[index])
      : [],
  };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

  const userTreeHistory = useQuery(
    ['usertreehistory', { volunteer: UserProfile.UserNickname }],
    getData,
    { enabled: !!UserProfile.UserNickname },
  );

  const userTreeHistoryData = userTreeHistory?.data ?? [];

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <StyledAvatar alt="Avatar" src={UserProfile.UserImageURL} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{UserProfile.UserName}</Typography>
          <Typography variant="body1">{UserProfile.UserNickname}</Typography>
          <Typography variant="body1">{UserProfile.UserEmail}</Typography>
          <Typography variant="body1">
            {UserLocation.UserCity}, {UserLocation.UserState} {UserLocation.UserZip}
          </Typography>
          <Typography variant="body1">
            <Tooltip title="Adopted">
              <span>
                <AdoptionIcon />
              </span>
            </Tooltip>{' '}
            {UserProfile.treeListAdopted.length}{' '}
            <Tooltip title="Liked">
              <StarIcon />
            </Tooltip>{' '}
            {UserProfile.treeListLiked.length}{' '}
            <Tooltip title="Planted">
              <img src={TreeIcon} alt="TreeIcon" style={{ height: 24, width: 24 }} />
            </Tooltip>{' '}
            {UserProfile.treeListPlanted.length}
          </Typography>
        </Grid>
      </Grid>
      <UserTreeHistoryTable rows={userTreeHistoryData} />
      <Footer/>
    </Box>
  );
}

export default UserProfile;
