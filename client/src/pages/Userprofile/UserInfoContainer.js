import { Star } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

import TreeIcon from '@/assets/images/addtree/tree12.svg';
import AdoptionIcon from '@/components/Icons/AdoptionIcon/AdoptionIcon';
import { TooltipBottom } from '@/components/Tooltip';

import './UserInfoContainer.scss';

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

const UserInfoContainer = ({
  adoptedTrees,
  likedTrees,
  plantedTrees,
  user,
}) => {
  const { name, nickname, email, picture } = user;
  return (
    <>
      <Box className="user-info-container">
        <Box className="hero">
          <Box className="avatar-box">
            <Avatar className="avatar-image" alt="Avatar" src={picture} />
            <Box className="avatar-info">
              <UserIcons
                adoptedCount={adoptedTrees.length}
                likedCount={likedTrees.length}
                plantedCount={plantedTrees.length}
              />
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body1">{nickname}</Typography>
              <Typography variant="body1">{email}</Typography>
            </Box>
          </Box>
        </Box>
        <div style={{ bgColor: '#FFF', padding: '40px 20px' }}>
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At in
            dignissim semper a sed nec in arcu amet. In quis non amet non
            blandit elit. Aliquet rhoncus hac ornare diam egestas. Dictumst
            molestie at orci arcu, sed nunc pretium. Ultrices id vitae
            pellentesque tellus eu adipiscing. Cursus morbi ultricies ipsum
            sagittis. Tristique interdum et, enim, pharetra duis. Sapien,
            posuere sapien etiam in vel in nec. Enim, vivamus egestas at non
            neque.
          </p>
        </div>
      </Box>
    </>
  );
};
export default UserInfoContainer;
