import React from 'react';

const ADDATREE = 'assets/images/logos/addatree.svg';
const TREETITLEIMAGE = 'assets/images/addtree/tree16.svg';
const EARTH = 'assets/images/addtree/earth2.svg';

export default ({ renderCount }) => (
  <>
    <img
      alt="EARTH"
      className="addtreemodal__header-image"
      src={EARTH}
    />
    <img
      alt="ADDATREE"
      className="addtreemodal__header-logo"
      src={ADDATREE}
    />
    <img
      alt="TREETITLEIMAGE"
      className="addtreemodal__header-image"
      src={TREETITLEIMAGE}
    />
    <span className="counter">
      Render Count:
      {' '}
      {renderCount}
    </span>

  </>
);
