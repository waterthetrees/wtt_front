import React from 'react';

export default function MapperFilter({ common }) {
  return (
    <div className="flex-grid  border-top text-left">
      <h3>
        Tree Filter
      </h3>
      <div className="treehistory-list">
        <button type="button">
          {' '}
          <h4>{common}</h4>
          {' '}
        </button>
      </div>
    </div>
  );
}
