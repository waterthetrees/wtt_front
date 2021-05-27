import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserAuth = () => {
  const { user, error } = useAuth0();
  const { picture, nickname } = user;

  return (
    <div>
      <img src={picture} />
    </div>
  );
};

export default UserAuth;
