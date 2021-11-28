import React from 'react';
import DataTable from './DataTable';

const toFixed = (data, key) => data[key].toFixed(3);
const locationKeys = ['address', 'city', 'zip', 'country', 'neighborhood',
  ['lng', 'Long', undefined, toFixed],
  ['lat', undefined, undefined, toFixed]
];
const moreInfoKeys = [['owner', 'Organization'], 'who', ['idReference', 'Reference #']];

export const TreeLocation = (props) => (
  <div className="flex-grid border-top">
    <div className="treehistory-list text-left">
      <h4 className="text-center">Location</h4>
      <DataTable
        data={props}
        keys={locationKeys}
      />
    </div>
  </div>
);

export const TreeMoreInfo = (props) => (
  <div className="flex-grid border-top">
    <div className="treehistory-list text-left">
      <h4 className="text-center">More info</h4>
      <DataTable
        data={props}
        keys={moreInfoKeys}
      />
      <div>
        <a href="https://standards.opencouncildata.org/#/trees" name="opencouncildata.org trees">
          Open Tree Standards
        </a>
      </div>
    </div>
  </div>
);
