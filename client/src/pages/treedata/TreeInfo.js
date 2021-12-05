import React from 'react';
import DataTable from './DataTable';

export const TreeInfo = (props) => (
  <div className="flex-grid border-top">
    <div className="treehistory-list text-left">
      <h4 className="text-center">Tree Info</h4>
      <DataTable
        data={props}
        keys={Object.keys(props)}
      />
    </div>
    <div className="treehistory-list text-center">
      <h4 className="text-center">Tree Info Links</h4>
      <a href="https://standards.opencouncildata.org/#/trees" name="opencouncildata.org trees">
        Open Tree Standards
      </a>
    </div>
  </div>
);
