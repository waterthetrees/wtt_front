import React from 'react';
import './UserProfile.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';

function UserProfile({}) {
  const { user } = useAuth0();
  // const nickname = user?.nickname;
  const email = user?.email;

  const userAdoptedTrees = useQuery(
    ['usertreehistory', { request: 'adopted', email: email ?? "" }],
    getData
  );

  const userAdoptedTreesHistory = userAdoptedTrees?.data;

  const userLikedTrees = useQuery(
    ['usertreehistory', { request: 'liked', email: email ?? "" }],
    getData
  );

  const userLikedTreesHistory = userLikedTrees?.data;

  // const userPlantedTrees = useQuery(
  //   ['usertreehistory', { request: 'planted', email: nickname ?? "nickname_doesnt_exist" }],
  //   getData
  // );

  // const userPlantedTreesHistory = userPlantedTrees?.data;
  // console.log(JSON.stringify(userPlantedTreesHistory));

  // const treeuserhistory = useQuery(['usertreehistory',
  //   { request: 'treeuserhistory', volunteer: nickname }], getData, { enabled: !!nickname });
  // const treeHistory = treeuserhistory?.data;
  // // console.log(JSON.stringify(treeHistory))

  const UserProfile = {
    UserEmail: user && user.email,
    UserImageURL: user && user.picture,
    UserName: user && user.name,
    UserNickname: user && user.nickname,
    treesLikedCount: 10,
    treeadoptionCount: 12,
    treesPlantedCount: 10,
    treeListAdopted: userAdoptedTreesHistory ? Object.keys(userAdoptedTreesHistory).map((index) => userAdoptedTreesHistory[index]) : [],
    treeListLiked: userLikedTreesHistory ? Object.keys(userLikedTreesHistory).map((index) => userLikedTreesHistory[index]) : [],
    // treeListPlanted: userPlantedTreesHistory ? Object.keys(userPlantedTreesHistory).map((index) => userPlantedTreesHistory[index]) : [],
  };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

   return (
    <ul>
      <li>{UserProfile.UserEmail}</li>
      <li>{UserProfile.UserImageURL}</li>
      <li>{UserProfile.UserName}</li>
      <li>{UserProfile.UserNickname}</li>
      <li>{UserProfile.treesLikedCount}</li>
      <li>{UserProfile.treeadoptionCount}</li>
      <li>{UserProfile.treesPlantedCount}</li>
      <li>{UserLocation.UserCity}</li>
      <li>{UserLocation.UserState}</li>
      <li>{UserLocation.UserZip}</li>

      <li>treeListAdopted</li>
      <ol>
        {UserProfile.treeListAdopted.map((tree) => (
          <li key={tree.idAdopted}>
            { tree.idTree }
          </li>
        ))}
      </ol>

      <li>treeListLiked</li>
      <ol>
        {UserProfile.treeListLiked.map((tree) => (
          <li key={tree.idLiked}>
            { tree.idTree }
          </li>
        ))}
      </ol>

      {/* <li>treeListPlanted</li>
      <ol>
        {UserProfile.treeListPlanted.map((tree) => (
          <li key={tree.idPlanted}>
            { tree.idTree }
          </li>
        ))}
      </ol> */}
    </ul>
  );
}

export default UserProfile;
