import React, { Component, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToggle,Modal, ModalHeader, ModalBody, 
         ModalFooter, Progress, ButtonGroup, Label, Col, Row } from 'reactstrap';
import cx from 'classnames';
import './UserProfile.scss';
import {getUserProfile} from '../../actions/index.js';
 
function UserProfile({toggle, modal}) {
  const user = useSelector(state => state.user)
  const [statusSelected, setStatusSelected] = useState();

  const dispatch = useDispatch();
  const saved = (event) => dispatch(getUserProfile({request: 'GetUserProfile', UserName}));
  const UserProfile = { UserImageURL: 'assets/images/users/painivert.jpg', 
                        UserName: 'Billy Eilish', 
                        TreeList: [{CommonName: 'Red Maple'}, {CommonName: 'Eureka Lemon'}], 
                        TreesCheckedSum: 10, 
                        TreesPlantedSum: 12, 
                        TreesIdentifiedSum: 2 };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

  const { UserImageURL, UserName, TreeList, TreesCheckedSum, TreesPlantedSum, TreesIdentifiedSum } = UserProfile;
  const { UserCity, UserState, UserZip } = UserLocation;

  return (
  
  <Modal isOpen={modal} toggle={toggle} className='UserProfile text-left'>
    <img className='userprofile__image' src={UserImageURL}/>
      
    <ModalHeader toggle={toggle}>
      <div className="flex-grid-one">
        <h3>{UserProfile.UserName}</h3>
      </div>
    </ModalHeader>

    <ModalBody>
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
          <p>ID'd</p>
        </div>
        </div>
      </div>

    </ModalBody>
    <ModalBody>
    </ModalBody>
    <ModalFooter>
      <div className="flex-grid-two">
        <div className="text-left">
          <h3>History</h3>
        </div>
        <div className="flex-grid tree__indent tree_history-list">
          <h4>{UserName} watered a tree</h4>
          <h5>dateWatered</h5>
        </div>
      </div>
    </ModalFooter>
  </Modal>
  );
}

export default UserProfile;