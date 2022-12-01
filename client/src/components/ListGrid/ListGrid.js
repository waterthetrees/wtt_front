import React, { useState } from 'react';
import './ListGrid.scss';

export function ListGrid({ data, columns, defaultSortIndex = 0 }) {
  const defaultSortColumn = columns[defaultSortIndex].key;
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [lastSortColumn, setLastSortColumn] = useState(defaultSortColumn);
  let sortColumn = lastSortColumn;

  if (!columns.find(({ key }) => key === sortColumn)) {
    // The new data doesn't include the last column we sorted on, so default to common/asc and
    // update the state for the next render.
    sortColumn = defaultSortColumn;
    setLastSortColumn(sortColumn);
    setSortOrderAsc(true);
  }

  const sortedList = sortList(data);

  function sortList(data) {
    return [...data].sort((a, b) => {
      const aa = a[sortColumn].toLowerCase();
      const bb = b[sortColumn].toLowerCase();

      if (aa > bb) return sortOrderAsc ? 1 : -1;
      if (bb > aa) return sortOrderAsc ? -1 : 1;

      return 0;
    });
  }

  const clickHandler = (event) => {
    const newColumn = event.target.value;
    let newOrder = !sortOrderAsc;

    if (newColumn !== sortColumn) {
      // Reset the sort order to ascending when the sort column changes.
      newOrder = true;
    }

    setSortOrderAsc(newOrder);
    setLastSortColumn(newColumn);
  };

  return (
    <div className="listgrid-list">
      <ListGridHeader clickHandler={clickHandler} columns={columns} />
      {sortedList.map((item) => (
        <ListGridItem
          item={item}
          columns={columns}
          key={`${item.common}${item.scientific}`}
        />
      ))}
    </div>
  );
}

function ListGridHeader({ clickHandler, columns }) {
  return (
    <div className="listgrid-list-header">
      {columns.map(({ key, label }) => (
        <div className="listgrid-list-header-item" key={key}>
          <button
            type="button"
            className="listgrid-header-btn"
            value={key}
            onClick={clickHandler}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}

function ListGridItem({ item, columns }) {
  return (
    <div className="listgrid-list-item" key={item.common}>
      {columns.map(({ key }) => (
        <div className="listgrid-list-item-item" key={key}>
          {item[key]}
        </div>
      ))}
    </div>
  );
}
