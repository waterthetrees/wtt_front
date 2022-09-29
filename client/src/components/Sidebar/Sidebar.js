import React from 'react';
import './Sidebar.scss';

export default function Sidebar({ children }) {
  return (
    <div id="sidebar" className="sidebar">
      <div className="sidebar-content">{children}</div>
    </div>
  );
}
