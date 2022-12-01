import React, { useState } from 'react';
import { MenuItem, FormControl, Button, Select } from '@mui/material';
import { CollectionsOutlined, GetApp } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { topTreesCaliforniaNative } from '@/data/dist/topTreesCaliforniaNative';
import { topTreesUSFood } from '@/data/dist/topTreesUSFood';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import './Data.scss';

const dataColumns = [
  {
    key: 'common',
    label: 'Common',
  },
  {
    key: 'scientific',
    label: 'Scientific',
  },
  {
    key: 'genus',
    label: 'Genus',
  },
  {
    key: 'height',
    label: 'Height',
  },
  {
    key: 'deciduousEvergreen',
    label: 'Deciduous or Evergreen',
  },
  {
    key: 'notes',
    label: 'Notes',
  },
];
const defaultSortColumn = dataColumns[0].key;
const dataSources = [
  {
    name: 'Native California Trees',
    data: topTreesCaliforniaNative,
    columns: dataColumns.slice(0, 5),
    url: 'https://calscape.org/loc-California/cat-Trees/ord-popular?srchcr=sc60ef7918b1949',
    thanks: 'Thanks to calscape.org for the California native tree data!',
  },
  {
    name: 'Food Trees',
    data: topTreesUSFood,
    columns: dataColumns.slice(0, 3),
    url: 'https://fallingfruit.org',
    thanks: 'Thanks to FallingFruit.org for the top US food tree data!',
  },
  {
    name: 'San Francisco Street Trees',
    data: topTreesSanFrancisco,
    columns: dataColumns.slice(0, 6),
    url: 'https://www.fuf.net/',
    thanks: 'Thanks to fuf.net for the top San Francisco street tree data!',
  },
];
const dataSourceMenuItems = dataSources.map(({ name }, value) => (
  <MenuItem key={name} value={value}>
    {name}
  </MenuItem>
));

export default function Data() {
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const { name, data, columns, url, thanks } = dataSources[selectedSourceIndex];

  const handleChange = (event) => {
    setSelectedSourceIndex(event.target.value);
  };

  return (
    <div className="data">
      <div className="data-menus">
        <div className="data-menus-item">
          <FormControl sx={{ minWidth: 200, my: 1 }}>
            <Select
              labelId="data-select-label"
              id="data-select"
              size="small"
              value={selectedSourceIndex}
              onChange={handleChange}
            >
              {dataSourceMenuItems}
            </Select>
          </FormControl>
        </div>
        <div className="data-menus-item">
          <CSVLink data={data} filename={`${name.replaceAll(' ', '-')}.csv`}>
            <Button variant="outlined">
              Download CSV{' '}
              <GetApp
                color="primary"
                fontSize="large"
                aria-label="Download CSV"
              />
            </Button>
          </CSVLink>
        </div>
        <div className="data-menus-item">
          <a href={url} target="_blank" rel="noreferrer">
            {thanks}
          </a>
        </div>
        <div className="data-menus-item">
          Unless otherwise specified, data are licensed as{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-NC-SA
          </a>{' '}
          (Creative Commons – Attribution, Non-commercial, Share-alike). This
          means that you are free to use and distribute the data so long as you
          preserve the original author/source attributions and do not use it
          (without permission) for commercial applications.
        </div>
      </div>
      <TreeList data={data} columns={columns} />
    </div>
  );
}

export function TreeList({ data, columns }) {
  console.log('data', data);
  console.log('columns', columns);
  const defaultSortColumn = columns[0].key;
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

  const sortedTrees = sortTrees(data);

  function sortTrees(trees) {
    return [...trees].sort((a, b) => {
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
    <div className="data-treelist">
      <TreeHeader clickHandler={clickHandler} columns={columns} />
      {sortedTrees.map((tree) => (
        <Tree
          tree={tree}
          columns={columns}
          key={`${tree.common}${tree.scientific}`}
        />
      ))}
    </div>
  );
}

function TreeHeader({ clickHandler, columns }) {
  return (
    <div className="data-treelist-tree-header">
      {columns.map(({ key, label }) => (
        <div className="data-treelist-tree-header-item" key={key}>
          <button
            type="button"
            className="data-treeheader-btn"
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

function Tree({ tree, columns }) {
  return (
    <div className="data-treelist-tree" key={tree.common}>
      {columns.map(({ key }) => (
        <div className="data-treelist-tree-item" key={key}>
          {tree[key]}
        </div>
      ))}
    </div>
  );
}
