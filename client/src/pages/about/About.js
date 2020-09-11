import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./About.scss";
const INFO_ICON = "assets/images/map/info-icon.svg";

export const AboutUs = () => {
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  return (
    <>
      <Button
        key="aboutUsButton"
        className="aboutIcon"
        onClick={() => {
          setShowAboutUsModal(true);
        }}
      >
        <img src={INFO_ICON} />
      </Button>
      <div>
        <Modal isOpen={showAboutUsModal}>
          <ModalHeader toggle={() => setShowAboutUsModal(false)}>
            About Us
          </ModalHeader>
          <ModalBody>
            Water The Trees is a platform that helps local communities crowd
            source urban tree maintenance and planting. We believe the power of
            urban trees on a multitude of levels: from increasing carbon
            sequestration to restoring our natural habitat for birds, insects,
            and fauna.
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
