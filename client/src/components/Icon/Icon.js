import React from "react";
import PropTypes from "prop-types";

import icons from "./icons";
// console.log('icons',icons);

const Icon = ({ glyph }) =>
  icons[glyph] ? (
    <img className="Icon" src={icons[glyph]} alt={`${glyph}-icon`} />
  ) : null;

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
};

export default Icon;
