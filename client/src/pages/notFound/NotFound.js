import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from '../../styles/app.scss';

export default function NotFound() {
  return (
    <div className={s.root}>
      <h1 className={s.title}>404</h1>
      <p>Sorry, the page you were trying to view does not exist.</p>
    </div>
  );
}
