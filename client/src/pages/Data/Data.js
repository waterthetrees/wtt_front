import React, { useState } from 'react';
import { MenuItem, FormControl, Button, Select } from '@mui/material';
import { GetApp } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { topTreesCaliforniaNative } from '@/data/dist/topTreesCaliforniaNative';
import { topTreesUSFood } from '@/data/dist/topTreesUSFood';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import { ListGrid } from '@/components/ListGrid/ListGrid';
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
      <ListGrid data={data} columns={columns} />
    </div>
  );
}
