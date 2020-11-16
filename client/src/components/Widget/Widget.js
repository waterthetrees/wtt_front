import React from 'react';
import cx from 'classnames';
import './Widget.scss';

const Widget = (props) => {
  const {title, classes, children} = props;

  return (
    <div className={cx("widget", classes)}>
      <div className="widget__header">
        <h3>{title}</h3>
      </div>
      <div className={cx("widget__content", classes)}>{children}</div>
    </div>
  );
}

export default Widget;
