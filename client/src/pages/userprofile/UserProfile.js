import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { makeStyles, withStyles }from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import {
  useUserAdoptedQuery,
  useUserLikedQuery,
  useUserPlantedQuery, useUserTreeHistoryQuery,
} from '../../api/queries';
import TreeIcon from '../../assets/images/addtree/tree12.svg';
import Footer from '../../components/Footer/Footer';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import UserTreeHistoryTable from '../../components/UserTreeHistoryTable/UserTreeHistoryTable';

const useIconStyles = makeStyles({
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

const useProfileStyles = makeStyles({
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

const IconTooltip = withStyles({
  tooltip: {
    fontSize: '1.125rem',
  },
})(Tooltip);

const StyledAvatar = styled(Avatar)({
  height: '8em',
  width: '8em',
});

const IconContainer = ({ adoptedCount, likedCount, plantedCount }) => {
  const classes = useIconStyles();

  return (
    <Box className={classes.box}>
      <IconTooltip title="Adopted" placement="bottom" arrow>
        <span className={classes.adoptedIconContainer}>
          <AdoptionIcon className={classes.adoptedIcon} />
        </span>
      </IconTooltip>
      <span className={classes.adoptedCount}>{adoptedCount}</span>

      <IconTooltip title="Liked" placement="bottom" arrow>
        <StarIcon className={classes.likedIcon} />
      </IconTooltip>
      <span className={classes.likedCount}>{likedCount}</span>

      <IconTooltip title="Planted" placement="bottom" arrow>
        <img src={TreeIcon} alt="TreeIcon" className={classes.plantedIcon} />
      </IconTooltip>
      <span className={classes.plantedCount}>{plantedCount}</span>
    </Box>
  );
};

export default function UserProfile() {
  const { user = {} } = useAuth0();
  const { name, nickname, email, picture } = user;
  const emailQuery = { email };
  const emailEnabled = { enabled: !!email };
  const { data: adoptedTrees = [] } = useUserAdoptedQuery(emailQuery, emailEnabled);
  const { data: likedTrees = [] } = useUserLikedQuery(emailQuery, emailEnabled);
  const { data: plantedTrees = [] } = useUserPlantedQuery(emailQuery, emailEnabled);
  const { data: treeHistory = [] } = useUserTreeHistoryQuery({ volunteer: nickname },
    { enabled: !!nickname });
  const classes = useProfileStyles();

  return (
    <Box>
      <div className={classes.container}>
        <div className={classes.avatarContainer}>
          <StyledAvatar alt="Avatar" src={picture} />
        </div>
        <div>
          <IconContainer
            adoptedCount={adoptedTrees.length}
            likedCount={likedTrees.length}
            plantedCount={plantedTrees.length}
          />
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body1">{nickname}</Typography>
          <Typography variant="body1">{email}</Typography>
        </div>
      </div>
      <UserTreeHistoryTable rows={treeHistory} />
      <Footer />
    </Box>
  );
}
