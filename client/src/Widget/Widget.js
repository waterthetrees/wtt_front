import React from 'react';
import cx from 'classnames';
import {Container} from 'reactstrap';


import PageHeader from './../PageHeader';
import './Widget.scss';

const Widget = (props) => {
  const {title, subtitle, name, classes, children, button_text, type} = props;

  return (
    <Container className={cx("Widget", classes)}>
      <PageHeader title={title} name={name} subtitle={subtitle} button_text={button_text} classes={classes} type={type} />
      <div className="Widget-text">{children}</div>
    </Container>
  );
}

export default Widget;
