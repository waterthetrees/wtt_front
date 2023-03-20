import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { MenuItem, FormControl, Button, Select } from '@mui/material';
import { CSVLink } from 'react-csv';
import ListGridHeader from '@/components/ListGridHeader/ListGridHeader';
import { searchArray } from '@/components/SearchBar/SearchBar';
import { WttButton } from '@/components/Button/Button';

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
      searchLabel={'Search Tree Info'}
    >
      <div className="listgridheader-content-item">
        <FormControl sx={{ minWidth: 265, my: 1 }}>
          <Select
            labelId="data-select-label"
            id="data-select"
            className="data-select"
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
          <WttButton
            aria-label="Download CSV"
            type="button"
            colorClass="wttbuttons__black"
          >
            <DownloadIcon
              color="gray"
              fontSize="large"
              aria-label="Download CSV"
              sx={{ className: 'wttbuttons__icon', paddingRight: '0.5rem' }}
            />
            Download CSV
          </WttButton>
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
