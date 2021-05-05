import React, {
  Component, useState, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function UserProfile({}) {
  const [statusSelected, setStatusSelected] = useState();
  const { user } = useAuth0();

  const UserProfile = {
    UserEmail: user && user.email,
    UserImageURL: user && user.picture,
    UserName: user && user.name,
    UserNickname: user && user.nickname,
    TreeList: [{ CommonName: 'Red Maple' }, { CommonName: 'Eureka Lemon' }],
    TreesCheckedSum: 10,
    TreesPlantedSum: 12,
    TreesIdentifiedSum: 2,
  };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

  const {
    UserEmail,
    UserImageURL,
    UserName,
    UserNickname,
    TreeList,
    TreesCheckedSum,
    TreesPlantedSum,
    TreesIdentifiedSum,
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
            <p className="userprofile__p">{TreesPlantedSum} planted / {TreesCheckedSum} checked / {TreesIdentifiedSum} identified</p>
          </div>
          <div className="userprofile__section">
            <h5>Tree List</h5>
            <ul>
              {TreeList.map( tree => <li key={tree.CommonName}>{ tree.CommonName }</li> )}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

export default UserProfile;
