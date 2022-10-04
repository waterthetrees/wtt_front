import React from 'react';
import './Contacts.scss';

const Affiliates = ({ affiliates }) => (
  <div className="affiliates">
    {affiliates.map((a) => (
      <div key={a.city} className="affiliates__city">
        {a.city}{' '}
        {Object.keys(a.links).map((l) => (
          <a key={l} href={a.links[l]} target="_blank" rel="noreferrer">
            {l}
          </a>
        ))}
      </div>
    ))}
  </div>
);

export default Affiliates;
