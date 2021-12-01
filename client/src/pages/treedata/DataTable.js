import React from 'react';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default function DataTable({ data }) {
  return (
    <div className="datatable">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="datatable__row">
          <span className="datatable__span">
            {capitalizeFirstLetter(key)}
            :
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
