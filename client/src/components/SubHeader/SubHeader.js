import React from 'react';
import './SubHeader.scss';

export default function SubHeader({ children }) {
  return (
    <div id="subheader" className="subheader">
      {children}
    </div>
  );
}
