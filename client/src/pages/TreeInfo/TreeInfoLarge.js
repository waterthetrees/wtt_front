import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import './TreeInfo.scss';

export default function TreeInfo(props) {
  console.log('props', props);
  const location = useLocation();
  console.log(location.userProps);
  console.log(location.trees);
  console.log('location', location);
  let { common } = useParams();
  const trees = location.state;

  console.log('common', common);
  // capitalize first letter of every word and separate by space
  const commonCapFirstLetterAndSpace =
    common.at(0).toUpperCase() + common.slice(1).replace(/-/g, ' ');

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
