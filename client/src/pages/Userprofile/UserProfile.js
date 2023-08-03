import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  useUserAdoptedQuery,
  useUserLikedQuery,
  useUserPlantedQuery,
  useUserTreeHistoryQuery,
} from '@/api/queries';
import UserInfoContainer from '@/components/UserInfoContainer/UserInfoContainer';
import UserTreeHistoryTable from '@/components/UserTreeHistoryTable/UserTreeHistoryTable';
import { Footer } from '@/components/Footer/Footer';

const ProfileContainer = styled(Box)`
  margin-top: 6em;
`;

export default function UserProfile() {
  const { user = {} } = useAuth0();
  const { nickname, email } = user;
  const emailQuery = { email };
  const emailEnabled = { enabled: !!email };
  const { data: adoptedTrees = [] } = useUserAdoptedQuery(
    emailQuery,
    emailEnabled,
  );
  const { data: likedTrees = [] } = useUserLikedQuery(emailQuery, emailEnabled);
  const { data: plantedTrees = [] } = useUserPlantedQuery(
    emailQuery,
    emailEnabled,
  );
  const { data: treeHistory = [] } = useUserTreeHistoryQuery(
    { volunteer: nickname },
    { enabled: !!nickname },
  );

  return (
    <>
      <ProfileContainer>
        <UserInfoContainer
          user={user}
          adoptedTrees={adoptedTrees}
          likedTrees={likedTrees}
          plantedTrees={plantedTrees}
        />
        <UserTreeHistoryTable rows={treeHistory} />
      </ProfileContainer>
      <Footer />
    </>
  );
}
