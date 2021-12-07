import React from 'react';
import cx from 'clsx';
import './Widget.scss';

const Widget = ({ title, classes, children }) => (
  <div className={cx('widget', classes)}>
    <div className="widget__header">
      <h3>{title}</h3>
    </div>
    <div className={cx('widget__content', classes)}>{children}</div>
  </div>
);

export default Widget;
