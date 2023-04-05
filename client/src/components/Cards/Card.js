import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import treeImages from '@/data/dist/treeImages.json';
import { ImageLoad } from '@/pages/Tree/TreeImage';
import './Card.scss';

export const Card = ({
  common,
  scientific,
  deciduousEvergreen,
  height,
  notes,
  // image,
  icon,
}) => {
  // const params = useParams();
  const scientificName = scientific.split(' ').join('-');
  // console.log('params', params.common, params);
  return (
    <div className="card">
      <h2>{common}</h2>
      <h4>{scientific}</h4>
      <div className="card__item">{height}</div>
      <div className="card__item">{deciduousEvergreen}</div>
      <div className="card__item-notes">{notes}</div>
      <div className="card__item-icon">{icon}</div>
      <div className="card__image">
        {scientific &&
          Object.prototype.hasOwnProperty.call(treeImages, scientific) && (
            <ImageLoad
              src={`http://localhost:3000/assets/images/treefilter/${scientificName}.jpg`}
              placeholder="placeholder.jpg"
            />
          )}
      </div>
    </div>
  );
};
