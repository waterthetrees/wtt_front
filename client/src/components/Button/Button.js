import React from 'react';
import './Button.scss';

export const WttButton = (props) => {
  const { children, onClick, type, style, colorClass } = props;
  return (
    <button
      aria-label={props['area-label']}
      type={type}
      onClick={onClick}
      style={style}
      className={colorClass}
    >
      {children}
    </button>
  );
};
