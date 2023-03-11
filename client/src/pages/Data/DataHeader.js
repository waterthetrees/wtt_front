import React from 'react';
import { GetApp } from '@mui/icons-material';
import { MenuItem, FormControl, Button, Select } from '@mui/material';
import { CSVLink } from 'react-csv';
import ListGridHeader from '@/components/ListGridHeader/ListGridHeader';
import { searchArray } from '@/components/SearchBar/SearchBar';

import { dataSources } from '@/pages/Data/dataArrays';

const dataSourceMenuItems = dataSources.map(({ name }, value) => (
  <MenuItem key={name} value={value}>
    {name}
  </MenuItem>
));

export default function DataHeader({
  search,
  setSearch,
  selectedDataSourceIndex,
  setSelectedDataSourceIndex,
}) {
  const { name, url, thanks, data } = dataSources[selectedDataSourceIndex];

  const handleChange = (event) => {
    setSelectedDataSourceIndex(event.target.value);
  };

  const dataFiltered = (search && searchArray(data, search)) || data;

  return (
    <ListGridHeader
      search={search}
      setSearch={setSearch}
      title={'Tree Information'}
      description={'Look through tree information here'}
      searchLabel={'Search Tree Information'}
    >
      <div className="listgridheader-content-item">
        <FormControl sx={{ minWidth: 200, my: 1 }}>
          <Select
            labelId="data-select-label"
            id="data-select"
            size="small"
            value={selectedDataSourceIndex}
            onChange={handleChange}
          >
            {dataSourceMenuItems}
          </Select>
        </FormControl>
      </div>

      <div className="listgridheader-content-item">
        <CSVLink
          data={dataFiltered}
          filename={`${name.replaceAll(' ', '-')}.csv`}
        >
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

      <div className="listgridheader-content-item">
        <a href={url} target="_blank" rel="noreferrer">
          {thanks}
        </a>
      </div>
    </ListGridHeader>
  );
}
