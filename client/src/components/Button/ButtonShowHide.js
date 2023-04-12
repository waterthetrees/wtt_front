import React from 'react';
import './Button.scss';

const treeImagesPath = 'assets/images/trees/';

export const ButtonShowHide = ({ showMore, setShowMore }) => {
  const onClick = () => setShowMore(!showMore);
  const arrowDirection = showMore
    ? `${treeImagesPath}arrowup.svg`
    : `${treeImagesPath}arrowdown.svg`;
  return (
    <button
      aria-label="showHide"
      type="button"
      onClick={onClick}
      className="showhide"
    >
      <img alt="showhide" className="showhide__img" src={arrowDirection} />
    </button>
  );
};
