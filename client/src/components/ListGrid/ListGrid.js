import React, { useState } from 'react';
import './ListGrid.scss';
import { Edit, Verified, GppBad } from '@mui/icons-material';

function sortList(data, sortColumn, sortOrderAsc = true) {
  return [...data].sort((a, b) => {
    const aa = a[sortColumn];
    const bb = b[sortColumn];

    if (aa === bb) return 0;
    if (aa === null || aa === undefined) return sortOrderAsc ? 1 : -1;
    if (bb === null || bb === undefined) return sortOrderAsc ? -1 : 1;

    // handle boolean value sorting for the "broken" column in the Source page
    if (typeof aa === 'boolean' && typeof bb === 'boolean') {
      return sortOrderAsc ? aa - bb : bb - aa;
    }

    const aStr = String(aa).toLowerCase();
    const bStr = String(bb).toLowerCase();

    if (sortOrderAsc) {
      // ascending
      return aStr.localeCompare(bStr);
    } else {
      // descending
      return bStr.localeCompare(aStr);
    }
  });
}

function createDynamicGridTemplateColumns(columnsNumber, listType) {
  // the case of listType source is used for the Source page to create specific column widths
  // the default case is used for the Data Page (or any other page that uses ListGrid) to create equal column widths
  switch (listType) {
    case 'source':
      return '2em 2.3em 8em 3.5em 3em 1fr 1fr 8.5em 1fr';
    default: {
      let templateColumns = '';
      for (let i = 0; i < columnsNumber; i++) {
        templateColumns += '1fr ';
      }
      return templateColumns;
    }
  }
}

export function ListGrid({
  data,
  columns,
  openEdit,
  setOpenEdit,
  defaultSortIndex = 0,
  setSource,
  listType,
}) {
  const defaultSortColumn = columns[defaultSortIndex].columnHeader;
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [lastSortColumn, setLastSortColumn] = useState(defaultSortColumn);
  let sortColumn = lastSortColumn;

  if (!columns.find(({ columnHeader }) => columnHeader === sortColumn)) {
    // The new data doesn't include the last column we sorted on, so default to common/asc and
    // update the state for the next render.
    sortColumn = defaultSortColumn;
    setLastSortColumn(sortColumn);
    setSortOrderAsc(true);
  }

  const sortedList = sortList(data, sortColumn, sortOrderAsc);

  const handleSort = (event) => {
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
    <div className="listgrid__list" key={listType}>
      <ListGridColumnHeaders
        handleSort={handleSort}
        columns={columns}
        listType={listType}
      />
      {sortedList.map((item) => (
        <ListGridItem
          item={item}
          columns={columns}
          key={item?.idSourceName}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          setSource={setSource}
          listType={listType}
        />
      ))}
    </div>
  );
}

function ListGridColumnHeaders({ handleSort, columns, listType }) {
  return (
    <div
      className="listgrid__columnheader"
      style={{
        gridTemplateColumns: createDynamicGridTemplateColumns(
          columns.length,
          listType,
        ),
      }}
    >
      {columns.map(({ columnHeader, label }) => (
        <div className="listgrid__columnheader-item" key={columnHeader}>
          <button
            type="button"
            className="listgrid__columnheader-btn"
            value={columnHeader}
            onClick={handleSort}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}

function createKey(item, columnHeader, index) {
  return item[columnHeader]
    ? `${columnHeader}-${item[columnHeader]}-${index}`
    : `${columnHeader}-${index}`;
}

function ListGridItem({ item, columns, setOpenEdit, setSource, listType }) {
  return (
    <div
      key={item?.idSourceName}
      className="listgrid__list-item"
      style={{
        gridTemplateColumns: createDynamicGridTemplateColumns(
          columns.length,
          listType,
        ),
      }}
    >
      {columns.map(({ columnHeader }, index) => (
        <div
          className="listgrid__list-item-item"
          key={createKey(item, columnHeader, index)}
        >
          <ListGridItemSwitch
            item={item}
            columnHeader={columnHeader}
            setOpenEdit={setOpenEdit}
            setSource={setSource}
          />
        </div>
      ))}
    </div>
  );
}

function ListGridItemSwitch({ item, columnHeader, setOpenEdit, setSource }) {
  switch (columnHeader) {
    case 'idSourceName':
      return (
        <ListGridIdSourceName
          source={item}
          setOpenEdit={setOpenEdit}
          setSource={setSource}
        />
      );
    case 'city':
      return (
        <ListGridItemDownload
          downloadUrl={item.download}
          itemDownloadName={item.city}
          setOpenEdit={setOpenEdit}
        />
      );
    case 'broken':
      return <ListGridItemCheckbox checked={item.broken} />;
    case 'email':
      return <ListGridItemEmail email={item.email} broken={item.broken} />;
    default:
      return item[columnHeader];
  }
}

function ListGridIdSourceName({ source, setOpenEdit, setSource }) {
  const handleClick = () => {
    setOpenEdit(true);
    setSource(source);
  };
  return (
    <div
      role="button"
      className="listgrid__list-item-editbutton"
      aria-label="Edit"
      tabIndex="0"
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <Edit color="info" fontSize="small" />
    </div>
  );
}

function ListGridItemDownload({ downloadUrl, itemDownloadName }) {
  return (
    <span className="listgrid__download">
      <a href={downloadUrl} target="_blank" rel="noreferrer">
        {itemDownloadName}
      </a>
    </span>
  );
}

function createEmailLink(email, broken) {
  let subject, body;

  if (broken) {
    subject = 'Water the Trees Source update request';
    body = `Hi,\n The tree source link for your city is broken, can you please update it here ${encodeURIComponent(
      'https://waterthetrees.com/data',
    )}`;
  } else {
    subject = 'Water the Trees Source inquiry';
    body = `Hi,\n I have a question about your tree data on ${encodeURIComponent(
      'https://waterthetrees.com/data',
    )}.`;
  }

  return `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function ListGridItemEmail({ email, broken }) {
  const mailTo = createEmailLink(email, broken);
  return (
    <a href={mailTo} target="_blank" rel="noreferrer">
      {email}
    </a>
  );
}

function ListGridItemCheckbox({ checked }) {
  return (
    <React.Fragment>
      {checked ? <GppBad color="error" /> : <Verified color="success" />}
    </React.Fragment>
  );
}
