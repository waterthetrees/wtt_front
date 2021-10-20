import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { styled, makeStyles, withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import React from 'react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import TreeIcon from '../../assets/images/addtree/tree12.svg';
import Footer from '../../components/Footer/Footer';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import UserTreeHistoryTable from '../../components/UserTreeHistoryTable/UserTreeHistoryTable';

const IconContainer = ({ treeListAdopted, treeListLiked, treeListPlanted }) => {
  const useStyles = makeStyles({
    box: {
      marginBottom: '2rem',
    },
    adoptedIconContainer: {
      display: 'inline-block',
    },
    adoptedIcon: {
      height: '2em',
      width: '2em',
    },
    adoptedCount: {
      fontSize: '1.25rem',
      margin: '0 1em 0 0.25em',
    },
    likedIcon: {
      height: '2em',
      width: '2em',
    },
    likedCount: {
      fontSize: '1.25rem',
      margin: '0 1em 0 0.25em',
    },
    plantedIcon: {
      height: '2.5em',
      width: '2.5em',
    },
    plantedCount: {
      fontSize: '1.25rem',
      marginLeft: '0.35em',
    },
  });

  const IconTooltip = withStyles({
    tooltip: {
      fontSize: '1.125rem',
    },
  })(Tooltip);

  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <IconTooltip title="Adopted" placement="bottom" arrow>
        <span className={classes.adoptedIconContainer}>
          <AdoptionIcon className={classes.adoptedIcon} />
        </span>
      </IconTooltip>
      <span className={classes.adoptedCount}>{treeListAdopted.length}</span>

      <IconTooltip title="Liked" placement="bottom" arrow>
        <StarIcon className={classes.likedIcon} />
      </IconTooltip>
      <span className={classes.likedCount}>{treeListLiked.length}</span>

      <IconTooltip title="Planted" placement="bottom" arrow>
        <img src={TreeIcon} alt="TreeIcon" className={classes.plantedIcon} />
      </IconTooltip>
      <span className={classes.plantedCount}>{treeListPlanted.length}</span>
    </Box>
  );
};

function UserProfile() {
  const useStyles = makeStyles({
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      marginBottom: '2em',
      marginTop: '4em',
    },
    avatarContainer: {
      margin: '0 3em 0 2em',
    },
  });

  const classes = useStyles();

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

  const userProfile = {
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

  const userTreeHistory = useQuery(
    ['usertreehistory', { volunteer: userProfile.UserNickname }],
    getData,
    { enabled: !!userProfile.UserNickname },
  );

  const userTreeHistoryData = userTreeHistory?.data ?? [];

  return (
    <Box>
      <div className={classes.container}>
        <div className={classes.avatarContainer}>
          <StyledAvatar alt="Avatar" src={userProfile.UserImageURL} />
        </div>
        <div>
          <IconContainer
            treeListAdopted={userProfile.treeListAdopted}
            treeListLiked={userProfile.treeListLiked}
            treeListPlanted={userProfile.treeListPlanted}
          />
          <Typography variant="body1">{userProfile.UserName}</Typography>
          <Typography variant="body1">{userProfile.UserNickname}</Typography>
          <Typography variant="body1">{userProfile.UserEmail}</Typography>
        </div>
      </div>
      <UserTreeHistoryTable rows={userTreeHistoryData} />
      <Footer />
    </Box>
  );
}

export default UserProfile;
