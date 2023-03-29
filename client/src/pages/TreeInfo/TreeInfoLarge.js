import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import './TreeInfo.scss';

const capFirstLetterAndSpace = (word) =>
  word.at(0).toUpperCase() + word.slice(1).replace(/-/g, ' ');

export default function TreeInfo() {
  const location = useLocation();
  let { common } = useParams();
  const trees = location.state;

  // capitalize first letter of every word and separate by space

  const commonCapFirstLetterAndSpace = capFirstLetterAndSpace(common);

  return (
    <div className="treeinfolarge">
      <div className="treeinfolarge__header">
        <h1>{commonCapFirstLetterAndSpace}</h1>
      </div>
      <div className="treeinfolarge__content">
        {trees &&
          Object.entries(trees).map(([key, value]) => {
            return (
              <div className="treeinfolarge__content-item" key={key}>
                {key}: {value}
              </div>
            );
          })}
      </div>
    </div>
  );
}
