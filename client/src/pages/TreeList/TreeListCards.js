import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag } from '@/components/Tag/Tag';
import { ImageLoad, setFormatImagePath } from '@/pages/Tree/TreeImage';
import { formatScientificName, toTitleCase } from '@/util/stringUtils';

import { Card } from '../../components/Card/Card';
import { dataSources } from './dataArrays';

import './TreeList.scss';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots.`;

export function getDormancyTagColor(dormancy) {
  switch (dormancy) {
    case 'evergreen':
      return 'green';
    case 'deciduous':
      return 'brown';
    case 'winter-deciduous':
      return 'blue';
    case 'summer-deciduous':
    case 'summer-semi-deciduous':
      return 'brown';
    default:
      return 'black';
  }
}

export const createTreePageRoute = (tree, routeName = 'tree') => {
  const nameFormatted = tree?.scientific?.toLowerCase().replace(/ /g, '-');
  return `/${routeName}/${nameFormatted}`;
};

export default function TreeListCards({ data, selectedDataSourceIndex }) {
  return (
    <div className="treelistcards">
      <div className="treelistcards__container">
        <div className="treelistcards__header">
          <Card>
            <div className="treelistcards__info">
              <h3>{HEADING_TEXT}</h3>
              <div className="treecare">
                <a
                  href={dataSources[selectedDataSourceIndex].treecare}
                  target="_blank"
                  className="treelistcards__link"
                  rel="noreferrer"
                >
                  Tree Care Program
                </a>
              </div>
            </div>
          </Card>
        </div>

        {data.map((tree, index) => {
          const { scientific, common, height, deciduousEvergreen } = tree;
          const treeImagePath = setFormatImagePath(scientific);
          const dormancy = deciduousEvergreen?.toLowerCase().replace(/ /g, '-');
          const tagVariant = getDormancyTagColor(dormancy);
          const formatCommon = toTitleCase(common);
          const formatScientific = formatScientificName(scientific);

          return (
            <NavLink
              className="treelistcards__link"
              to={{
                pathname: createTreePageRoute(tree),
              }}
              state={{ tree, selectedDataSourceIndex }}
              key={`${tree?.scientific}-${index}`}
            >
              <Card>
                {treeImagePath && (
                  <div className="treelistcards__image">
                    <ImageLoad
                      src={treeImagePath}
                      placeholder="placeholder.jpg"
                    />
                  </div>
                )}
                <div className="treelistcards__info">
                  <h2>{formatCommon}</h2>
                  <h4 className="scientific">{formatScientific}</h4>
                  <div className="treelistcards__item">{height}</div>
                  {deciduousEvergreen && (
                    <Tag variant={tagVariant}>{dormancy}</Tag>
                  )}
                </div>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
