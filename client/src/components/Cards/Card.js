import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Card.scss';

export const Card = ({
  common,
  scientific,
  deciduousEvergreen,
  height,
  notes,
  image,
  icon,
}) => {
  // const params = useParams();

  // console.log('params', params.common, params);
  return (
    <div className="card">
      <img
        src={image}
        className="attachment-medium size-medium"
        alt={name}
        decoding="async"
        loading="lazy"
        // srcSet="https://caseytrees.org/wp-content/uploads/2017/01/primary_american_hophornbeam-300x160.jpg 300w, https://caseytrees.org/wp-content/uploads/2017/01/primary_american_hophornbeam-600x321.jpg 600w, https://caseytrees.org/wp-content/uploads/2017/01/primary_american_hophornbeam-768x411.jpg 768w, https://caseytrees.org/wp-content/uploads/2017/01/primary_american_hophornbeam.jpg 780w"
        sizes="(max-width: 300px) 100vw, 300px"
      />
      <h2>{common}</h2>
      <h4>{scientific}</h4>
      <div className="card__item">{height}</div>
      <div className="card__item">{deciduousEvergreen}</div>
      <div className="card__item-notes">{notes}</div>
      <div className="card__item-icon">{icon}</div>
    </div>
  );
};
