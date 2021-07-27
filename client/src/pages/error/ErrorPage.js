/* eslint-disable consistent-return */
import React from 'react';
import './ErrorPage.scss';
import cx from 'clsx';

export default function ErrorMessageAll({
  errors, name, error, variant, message,
}) {
  // console.log(errors, name, error, variant, message);
  if (!error && !message && Object.keys(errors).length === 0) return;
  const type = (!error && !message && errors[name] && errors[name].type) ? errors[name].type : name;
  switch (type) {
  case 'required': return <ErrorMessage variant={variant} errorMessage={`${name} is required`} />;
  case 'minLength': return <ErrorMessage variant={variant} errorMessage={`${name} is too short`} />;
  case 'maxLength': return <ErrorMessage variant={variant} errorMessage={`${name} exceeds maximum length`} />;
  case 'pattern': return <ErrorMessage variant={variant} errorMessage={`${name} needs correct format.`} />;
  case 'error': return <ErrorMessage variant={variant} errorMessage={error} />;
  case 'message': return <ErrorMessage variant={variant} errorMessage={message} />;
  default: return (<ErrorMessage variant={variant} errorMessage={error} />);
  }
}

const ErrorMessage = ({ errorMessage, variant }) => (<div role="alert" className={cx('alert', `alert-${variant}`)}>{errorMessage}</div>);
