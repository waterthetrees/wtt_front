import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import React from 'react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import TreeIcon from '../../assets/images/addtree/tree12.svg';
import Footer from '../../components/Footer/Footer';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import UserTreeHistoryTable from '../../components/UserTreeHistoryTable/UserTreeHistoryTable';

function UserProfile() {
  const StyledAvatar = styled(Avatar)({
    height: '8em',
    width: '8em',
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
      <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2em' }}>
        <div style={{ margin: '0 3em 0 2em' }}>
          <StyledAvatar alt="Avatar" src={UserProfile.UserImageURL} />
        </div>
        <div>
          <Box mb="2rem">
            <Tooltip
              title={<div style={{ fontSize: '1.125rem' }}>Adopted</div>}
              placement="bottom"
              arrow
            >
              <span style={{ display: 'inline-block' }}>
                <AdoptionIcon style={{ height: '2em', width: '2em' }} />
              </span>
            </Tooltip>
            <span style={{ fontSize: '1.25rem', margin: '0 1em 0 0.25em' }}>
              {UserProfile.treeListAdopted.length}
            </span>

            <Tooltip
              title={<div style={{ fontSize: '1.125rem' }}>Liked</div>}
              placement="bottom"
              arrow
            >
              <StarIcon style={{ height: '2em', width: '2em' }} />
            </Tooltip>
            <span style={{ fontSize: '1.25rem', margin: '0 1em 0 0.25em' }}>
              {UserProfile.treeListLiked.length}
            </span>

            <Tooltip
              title={<div style={{ fontSize: '1.125rem' }}>Planted</div>}
              placement="bottom"
              arrow
            >
              <img src={TreeIcon} alt="TreeIcon" style={{ height: '2.5em', width: '2.5em' }} />
            </Tooltip>
            <span style={{ fontSize: '1.25rem', marginLeft: '0.35em' }}>
              {UserProfile.treeListPlanted.length}
            </span>
          </Box>
          <Typography variant="body1">{UserProfile.UserName}</Typography>
          <Typography variant="body1">{UserProfile.UserNickname}</Typography>
          <Typography variant="body1">{UserProfile.UserEmail}</Typography>
          <Typography variant="body1">
            {UserLocation.UserCity}
            ,
            {' '}
            {UserLocation.UserState}
            {' '}
            {UserLocation.UserZip}
          </Typography>
        </div>
      </div>
      <UserTreeHistoryTable rows={userTreeHistoryData} />
      <Footer />
    </Box>
  );
}

export default UserProfile;
