import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./About.scss";
// const INFO_ICON = "assets/images/map/info-icon.svg";
// const WTT_FAT = "assets/images/logos/wtt-fat.svg";
// const WATER_THE_TREES = "assets/images/logos/waterthetrees-fat.svg";
// const WATER_THE_TREES = "assets/images/logos/waterthetrees-viga.svg";
// const WATER_THE_TREES = "assets/images/logos/waterthetrees-riteous.svg";
const WATER_THE_TREES = "assets/images/logos/waterthetrees-fatstraight.svg";
// const WTT_FAT = "assets/images/logos/wtt-fatter.svg";
// const WTT_FAT = "assets/images/logos/wtt-riteous.svg";
// const WTT_FAT = "assets/images/logos/wtt-viga.svg";

export const AboutUs = () => {
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  return (
    <>
      <div className="about">
        <img 
          key="aboutUsButton"
          className="about__icon"
          onClick={() => {
            setShowAboutUsModal(!showAboutUsModal);
          }}
        src={WATER_THE_TREES} />
      </div>
      <div>
        <Modal isOpen={showAboutUsModal}>
          <ModalHeader toggle={() => setShowAboutUsModal(!showAboutUsModal)}>
            About Water the Trees
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
