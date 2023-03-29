import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import treeImages from '@/data/dist/treeImages.json';
import './TreeInfo.scss';
import { ImageLoad } from '@/pages/Tree/TreeImage';

const capFirstLetterAndSpace = (word) =>
  word.at(0).toUpperCase() + word.slice(1).replace(/-/g, ' ');

export default function TreeInfo() {
  const location = useLocation();
  let { common } = useParams();
  const trees = location.state;
  const { scientific } = trees;
  console.log('scientific', treeImages[scientific], trees);
  const wikipediaExtract =
    treeImages[scientific]?.content || treeImages[scientific]?.extract || '';

  return (
    <div className="treeinfolarge">
      <div className="treeinfolarge__image">
        {scientific &&
          Object.prototype.hasOwnProperty.call(treeImages, scientific) && (
            <ImageLoad
              src={treeImages[scientific]?.imageURL}
              placeholder="placeholder.jpg"
            />
          )}
      </div>
      <div className="treeinfolarge__content">
        {trees &&
          Object.entries(trees).map(([key, value]) => {
            const cappedKey = capFirstLetterAndSpace(key);
            const cappedValue = capFirstLetterAndSpace(value);
            switch (key) {
              case 'common':
                return (
                  <div className="treeinfolarge__header" key={key}>
                    <h1>{cappedValue}</h1>
                  </div>
                );
              case 'scientific':
                return (
                  <div className="treeinfolarge__header" key={key}>
                    <h3>{cappedValue}</h3>
                  </div>
                );
              default:
                return (
                  <div className="treeinfolarge__content-item" key={key}>
                    {cappedKey}: {value}
                  </div>
                );
            }
          })}
        {wikipediaExtract && (
          <div className="treeinfolarge__content-item">
            Wikipedia: {wikipediaExtract}
          </div>
        )}
      </div>
    </div>
  );
}
