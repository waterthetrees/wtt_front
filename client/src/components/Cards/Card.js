import React from 'react';
import treeImages from '@/data/dist/treeImages.json';
import { ImageLoad } from '@/pages/Tree/TreeImage';
import { Tag } from '@/components/Tag/Tag';
import './Card.scss';

export const Card = ({
  common,
  scientific,
  deciduousEvergreen,
  height,
  notes,
  icon,
}) => {
  const scientificName = scientific.split(' ').join('-');
  const tagVariant = deciduousEvergreen === 'deciduous' ? 'brown' : 'green';
  return (
    <div className="card">
      <div className="card__image">
        {scientific &&
          Object.prototype.hasOwnProperty.call(treeImages, scientific) && (
            <ImageLoad
              src={`../../assets/images/data/${scientificName}.jpg`}
              placeholder="placeholder.jpg"
            />
          )}
      </div>
      <h2>{common}</h2>
      <h4>{scientific}</h4>
      <div className="card__item">{height}</div>
      {deciduousEvergreen && (
        <Tag variant={tagVariant}>{deciduousEvergreen}</Tag>
      )}
      <div className="card__item-notes">{notes}</div>
      <div className="card__item-icon">{icon}</div>
    </div>
  );
};
