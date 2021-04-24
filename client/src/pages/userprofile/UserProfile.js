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
    <div className="UserProfile text-left">
      <img className="userprofile__image" src={UserImageURL} alt="userprofile" />

      <div className="flex-grid-one">
        <h3>{UserProfile.UserName}</h3>
      </div>

      <div className="flex-grid-two tree__status">
        <div className="text-left">
          <h3>Achievements</h3>
        </div>
        <div className="flex-grid-one text-center">
          <div className="text-center">
            <Button className="btn rounded" color="danger">
              {TreesPlantedSum}
            </Button>
            <p>Planted</p>
          </div>

          <div className="text-center">
            <Button className="btn rounded" color="danger">
              {TreesCheckedSum}
            </Button>
            <p>Checked</p>
          </div>

          <div className="text-center">
            <Button className="btn rounded" color="danger">
              {TreesIdentifiedSum}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grid-two">
        <div className="text-left">
          <h3>History</h3>
        </div>
        <div className="flex-grid tree__indent tree_history-list">
          <h4>
            {UserName}
            {' '}
            watered a tree
          </h4>
          <h5>dateWatered</h5>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
