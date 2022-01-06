import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star } from '@mui/icons-material';
import {
  useUserAdoptedQuery,
  useUserLikedQuery,
  useUserPlantedQuery,
  useUserTreeHistoryQuery,
} from '../../api/queries';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';
import TreeIcon from '../../assets/images/addtree/tree12.svg';
import UserTreeHistoryTable from '../../components/UserTreeHistoryTable/UserTreeHistoryTable';
import Footer from '../../components/Footer/Footer';
import { TooltipBottom } from '../../components/Tooltip';

const ProfileContainer = styled(Box)`
  margin-top: 6em;
`;

const UserInfoContainer = styled(Box)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2em;
`;

const UserAvatar = styled(Avatar)`
  width: 8em;
  height: 8em;
  margin: 0 3em 0 2em;
`;

const UserActionIcon = ({ title, icon, count }) => (
  <TooltipBottom title={title}>
    <div
      style={{
        marginRight: '1em',
        display: 'inline-block',
        fontSize: '1.25em',
      }}
    >
      {icon}
      <span style={{ marginLeft: '0.35rem' }}>{count}</span>
    </div>
  </TooltipBottom>
);

const iconStyle = {
  height: '2em',
  width: '2em',
};

const UserIcons = ({ adoptedCount, likedCount, plantedCount }) => (
  <Box sx={{ mb: 2 }}>
    <UserActionIcon
      title="Adopted"
      count={adoptedCount}
      icon={<AdoptionIcon style={iconStyle} />}
    />
    <UserActionIcon
      title="Liked"
      count={likedCount}
      icon={<Star style={iconStyle} />}
    />
    <UserActionIcon
      title="Planted"
      count={plantedCount}
      icon={<img src={TreeIcon} style={{ ...iconStyle, marginRight: '.2em' }} />}
    />
  </Box>
);

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

  return (
    <>
      <ProfileContainer>
        <UserInfoContainer>
          <UserAvatar alt="Avatar" src={picture} />
          <div>
            <UserIcons
              adoptedCount={adoptedTrees.length}
              likedCount={likedTrees.length}
              plantedCount={plantedTrees.length}
            />
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body1">{nickname}</Typography>
            <Typography variant="body1">{email}</Typography>
          </div>
        </UserInfoContainer>
        <UserTreeHistoryTable rows={treeHistory} />
      </ProfileContainer>
      <Footer />
    </>
  );
}
