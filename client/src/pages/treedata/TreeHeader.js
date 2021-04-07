import React from 'react';
import { Button } from 'reactstrap';
import format from 'date-fns/format';

export default function TreeHeader({
  common, scientific, genus,
  datePlanted, edit, height, dbh,
}) {
  return (
    <div className="flex-grid-three text-left">
      {common && (
        <div>
          <h3>{common}</h3>
        </div>
      )}
      {scientific && (
        <div>
          <h4>{scientific}</h4>
        </div>
      )}
      {genus && (
        <div>
          <h4>{genus}</h4>
        </div>
      )}
      {datePlanted && !common.includes('VACANT') && (
        <div>
          <h5>
            Planted:
            {' '}
            {format(new Date(datePlanted), 'MMMM dd, yyyy')}
          </h5>
        </div>
      )}
      {height && (
        <div>
          <h5>
            Height:
            {' '}
            {height}
          </h5>
        </div>
      )}
      {dbh && (
        <div>
          <h5>
            DBH:
            {' '}
            {dbh}
          </h5>
        </div>
      )}

      <div className="treedata__edit-btn text-right">
        <Button color="link" className="btn-sm" onClick={edit}>Edit</Button>
      </div>
    </div>
  );
}
