import React, {
  Component, useState, useRef, useEffect,
} from 'react';
import {
  Button,
  ButtonToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  ButtonGroup,
  Label,
  Col,
  Row,
} from 'reactstrap';
import cx from 'classnames';
import './UserProfile.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getData, putData, postData } from '../../api/queries';

function UserProfile({}) {
  const { user } = useAuth0();
  const nickname = user?.nickname;
  const email = user?.email;
  console.log(email, 'email');
  // const [statusSelected, setStatusSelected] = useState();

  const treeuserhistory = useQuery(['usertreehistory',
    { request: 'treeuserhistory', volunteer: nickname }], getData, { enabled: !!nickname });
  console.log(treeuserhistory, 'treeuserhistory');
  const treeHistory = treeuserhistory?.data;

  const treeadoption = useQuery(['user',
    { request: 'treeadoption', email }], getData, { enabled: !!email });
  const treeadoptionCount = treeadoption?.data?.treeadoptionCount;
  const treelikes = useQuery(['user',
    { request: 'treelikes', email }], getData, { enabled: !!email });
  const treelikesCount = treelikes?.data?.treelikesCount;
  const treedata = useQuery(['user',
    { request: 'treedata', email }], getData, { enabled: !!email });
  const treesplantedCount = treedata?.data?.treedataCount;

  const queryClient = useQueryClient();

  const UserProfile = {
    UserEmail: user && user.email,
    UserImageURL: user && user.picture,
    UserName: user && user.name,
    UserNickname: user && user.nickname,
    TreeList: [{ CommonName: 'Red Maple' }, { CommonName: 'Eureka Lemon' }],
    // treesLikedCount: 10,
    // treeadoptionCount: 12,
    treesPlantedCount: 2,
  };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

  const {
    UserEmail,
    UserImageURL,
    UserName,
    UserNickname,
    TreeList,
    // treesLikedCount,
    // treeadoptionCount,
    treesPlantedCount,
  } = UserProfile;
  const { UserCity, UserState, UserZip } = UserLocation;

  return (
    <section className="UserProfile">

      <div className="userprofile__flex">
        {UserImageURL && <img className="userprofile__image" src={UserImageURL} alt="userprofile" />}
        <div>
          <div className="userprofile__section">
            <h3>{UserProfile.UserName}</h3>
            <p className="userprofile__p">{UserProfile.UserEmail}</p>
          </div>
          <div className="userprofile__section">
            <h5>Tree History</h5>
            <p className="userprofile__p">
              {treesplantedCount}
              {' '}
              planted /
              {' '}
              {treeadoptionCount}
              {' '}
              adopted /
              {' '}
              {treelikesCount}
              {' '}
              liked
            </p>
          </div>
          {treeHistory && (
            <div className="userprofile__section">
              <h5>Tree List</h5>
              <ol>
                {treeHistory.map((tree) => (
                  <li key={tree.id_tree}>
                    { tree.id_tree }
                    {' '}
                    <b>{ tree.common }</b>
                    {' '}
                    { tree.scientific }
                    ,
                    {' '}
                    { tree.health }
                    {' '}
                    health
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

export default UserProfile;
