import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star } from '@mui/icons-material';
import TreeIcon from '@/assets/images/addtree/tree12.svg';
import AdoptionIcon from '@/components/Icons/AdoptionIcon/AdoptionIcon';
import { TooltipBottom } from '@/components/Tooltip';
import './UserInfoContainer.scss';

const UserAvatar = styled(Avatar)`
  width: 8em;
  height: 8em;
  margin: 0 3em 0 2em;
`;

const iconStyle = {
  height: '2em',
  width: '2em',
};

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
      icon={
        <img
          alt=""
          src={TreeIcon}
          style={{ ...iconStyle, marginRight: '0.2em' }}
        />
      }
    />
  </Box>
);

const UserInfoContainer = ({ adoptedTrees, likedTrees, plantedTrees, user }) => {
  const { name, nickname, email, picture } = user;
  return (
    <div className="user-info-container">
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
    </div>
  )
}
export default UserInfoContainer
