import React from 'react';
import { Button } from 'reactstrap';
import format from 'date-fns/format';
import DataTable from './DataTable';

const headerKeys = [
  ['common', '', 'h3'],
  ['scientific', '', 'h4'],
  // For many trees, the scientific and genus names are the same, so suppress that.
  ['genus', '', 'h4', (data) => data.genus !== data.scientific && data.genus],
  ['datePlanted', 'Planted', 'h5',
    (data) => data.datePlanted
      && !data.common.includes('VACANT')
      && format(new Date(data.datePlanted), 'MMMM d, yyyy')],
  ['height', undefined, 'h5'],
  ['dbh', 'DBH', 'h5'],
];

export default function TreeHeader(props) {
  return (
    <div className="flex-grid-three text-left">
      <DataTable
        data={props}
        keys={headerKeys}
      />

      <div className="treedata__edit-btn text-right">
        <Button color="link" className="btn-sm" onClick={props.edit}>Edit</Button>
      </div>
    </div>
  );
}
