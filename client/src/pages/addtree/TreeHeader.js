import React from 'react';

const ADDATREE = 'assets/images/addtree/addatree.svg';
const TREETITLEIMAGE = 'assets/images/addtree/tree16.svg';

export default () => (
  <>
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
  </>
);
