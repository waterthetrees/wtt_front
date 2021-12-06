import React from 'react';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default function DataTable({ data }) {
  return (
    <div className="datatable">
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          {value && (
            <div className="datatable__row">
              <span className="datatable__span-key">
                {capitalizeFirstLetter(key)}
                :
              </span>
              <span className="datatable__span-value">{value}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
