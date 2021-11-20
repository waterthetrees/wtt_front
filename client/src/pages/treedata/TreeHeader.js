import React from 'react';
import { Button } from '@material-ui/core';
import format from 'date-fns/format';
import DataTable from './DataTable';
import { env } from '../../util/config';

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
    <div className="text-left">
      <DataTable
        data={props}
        keys={headerKeys}
      />

      {env !== 'prod'
        && (
          <div className="text-right">
            <Button color="primary" onClick={props.edit}>Edit</Button>
          </div>
        )}
    </div>
  );
}
