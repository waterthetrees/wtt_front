import React from 'react';
import './Tag.scss';

export const Tag = ({ variant, children }) => {
  const tagVariant = `tag__${variant}`;
  return (
    <div className="tag">
      <div className={tagVariant}>{children}</div>
    </div>
  );
};
