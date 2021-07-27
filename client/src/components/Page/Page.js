import React from 'react';
import cx from 'clsx';
import { Container } from 'reactstrap';
import Footer from '../Footer';
import './Page.scss';

const Page = (props) => {
  const {
    title, className, children, button_text, type,
  } = props;

  return (
    <Container className={cx('page', className)}>
      <div className="page__text">{children}</div>
    </Container>
  );
};

export default Page;
// <Footer />
