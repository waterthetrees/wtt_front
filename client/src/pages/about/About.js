import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./About.scss";
const INFO_ICON = "assets/images/map/info-icon.svg";

export const AboutUs = () => {
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  return (
    <>
        <img 
          key="aboutUsButton"
          className="about__icon"
          onClick={() => {
            setShowAboutUsModal(true);
          }}
        src={INFO_ICON} />
      <div>
        <Modal isOpen={showAboutUsModal}>
          <ModalHeader toggle={() => setShowAboutUsModal(false)}>
            About Us
          </ModalHeader>
          <ModalBody>
            Water The Trees is a platform that helps local communities crowd
            source urban tree maintenance and planting. We believe in the power of
            urban trees on a multitude of levels: from increasing carbon
            sequestration to restoring our natural habitat for birds, insects,
            and fauna.
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
