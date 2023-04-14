import React from 'react';
import './Card.scss';

export const Card = ({ children }) => {
  return (
    <div data-testid="card" className="card">
      {children}
    </div>
  );
};
