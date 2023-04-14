import React from 'react';
import './Button.scss';

const treeImagesPath = 'assets/images/trees/';

export const ButtonShowHide = ({ showMore, setShowMore }) => {
  const onClick = () => setShowMore(!showMore);
  const arrowDirection = showMore ? `hide` : `show`;
  const pathName = `${treeImagesPath}arrow-${arrowDirection}.svg`;
  return (
    <button
      aria-label={`Button-${arrowDirection}`}
      type="button"
      onClick={onClick}
      className="showhide"
      title={arrowDirection}
    >
      <img alt={arrowDirection} className="showhide__img" src={pathName} />
    </button>
  );
};
