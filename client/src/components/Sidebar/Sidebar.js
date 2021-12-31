import React from 'react';
import './Sidebar.scss';

export default function Sidebar({ children }) {
  return (
    <div id="sidebar" className="sidebar">
      <div className="sidebar__content">
        {children}
      </div>
    </div>
  );
}
