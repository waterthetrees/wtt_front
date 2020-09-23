import React from "react";

import { AboutUs } from "../../pages/about/About.js";
import "./Header.scss";

const Header = (props) => {
  const component_name = "Header";
  return (
  <div className="header">
    <div className="header__content">
      <div className="aboutpage">
        <AboutUs />
      </div>
    </div>
  </div>
  );
};

export default Header;
