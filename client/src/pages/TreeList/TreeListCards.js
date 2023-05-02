import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag } from '@/components/Tag/Tag';
import { ImageLoad, setFormatImagePath } from '@/pages/Tree/TreeImage';
import { formatScientificName, toTitleCase } from '@/util/stringUtils';

import { Card } from '../../components/Card/Card';
import { dataSources } from './dataArrays';

import './TreeList.scss';

const routeName = 'tree';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots.`;

export default function TreeListCards({ data, selectedDataSourceIndex }) {
  return (
    <div className="treelistcards">
      <div className="treelistcards__container">
        <div className="treelistcards__header">
          <Card>
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
          </Card>
        </div>

        {data.map((tree, index) => {
          const nameFormatted = tree?.common?.toLowerCase().replace(/ /g, '-');
          const urlRoute = `/${routeName}/${nameFormatted}`;
          const { scientific, common, height, deciduousEvergreen } = tree;
          const treeImagePath = setFormatImagePath(scientific);
          const tagVariant =
            deciduousEvergreen === 'deciduous' ? 'brown' : 'green';
          const formatCommon = toTitleCase(common);
          const formatScientific = formatScientificName(scientific);

          return (
            <NavLink
              className="treelistcards__link"
              to={{
                pathname: urlRoute,
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
                <h2>{formatCommon}</h2>
                <h4 className="scientific">{formatScientific}</h4>
                <div className="treelistcards__item">{height}</div>
                {deciduousEvergreen && (
                  <Tag variant={tagVariant}>{deciduousEvergreen}</Tag>
                )}
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
