import React from 'react';
import { Card } from '../../components/Cards/Card';
import { NavLink } from 'react-router-dom';
import './TreeInfo.scss';
const routeName = 'treeinfo';

export default function TreeList({ data }) {
  return (
    <div className="treeinfolist">
      <div className="treeinfolist__header">
        <p>
          We encourage you to plant medium and larger-sized trees, as they
          provide greater benefits to the city than smaller trees. Young trees
          require 1.5 inches of rain or 25 gallons of water per week for the
          first three years to establish their roots.
        </p>
      </div>

      {data.map((tree, index) => {
        const nameFormatted = tree?.common.toLowerCase().replace(/ /g, '-');
        const urlRoute = `/${routeName}/${nameFormatted}`;
        const { notes, ...treeRest } = tree;
        return (
          <NavLink
            className="treeinfolist__link"
            to={{
              pathname: urlRoute,
            }}
            state={tree}
            key={`${tree?.scientific}-${index}`}
          >
            <Card {...treeRest} />
          </NavLink>
        );
      })}
    </div>
  );
}

{
  /* <div className="treeinfo__list">
  {dataList &&
    dataList.map((tree, index) => {
      const nameFormatted = tree?.common.toLowerCase().replace(/ /g, '-');
      const urlRoute = `/${routeName}/${nameFormatted}`;
      const { notes, ...treeRest } = tree;
      return (
        <NavLink
          className="treeinfo__link"
          to={{
            pathname: urlRoute,
          }}
          state={tree}
          key={`${tree?.scientific}-${index}`}
        >
          <Card {...treeRest} />
        </NavLink>
      );
    })}
</div>; */
}
