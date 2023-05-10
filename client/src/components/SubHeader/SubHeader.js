import React from 'react';

import './SubHeader.scss';

export default function SubHeader({ children }) {
  return (
    <div data-testid="subheader" className="subheader">
      {children}
    </div>
  );
}
