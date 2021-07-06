import React from 'react';
import './Contacts.scss';
import { Link } from 'react-router-dom';

const Affiliates = ({ affiliates }) => (
  <div className="affiliates">
    {affiliates.map((a) => (
      <div key={a.city}>
        {a.city}
        {' '}
        {Object.keys(a.links).map((l) => (
          <a href={a.links[l]} target="_blank" rel="noreferrer">
            {l}
          </a>
        ))}
      </div>
    ))}
  </div>
);

export default Affiliates;
