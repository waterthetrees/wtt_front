import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import './SearchBar.scss';

const SearchBar = ({ className, options }) => {
  return (
    <Autocomplete
      className={className}
      id="searchbar-input"
      freeSolo
      autoHighlight
      autoComplete
      noOptionsText="No results found"
      options={options}
      groupBy={(option) => option.type}
      sx={{
        backgroundColor: 'white',
        borderRadius: '4px',
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search Water the Trees"
            InputProps={{
              ...params.InputProps,
              className: 'search-input',
              disableUnderline: true,
              startAdornment: <SearchIcon />,
            }}
          />
        );
      }}
      renderOption={(props, option) => (
        <SearchResult props={props} option={option} />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          {params.children}
        </li>
      )}
    />
  );
};

const SearchResult = ({ option, props }) => {
  return (
    <div {...props} className={`${props.className} search-result`}>
      <div className="left-container">
        <PlaceOutlinedIcon fontSize="large" htmlColor="grey" />
        <div className="result-info">
          <div className="label">{option.label}</div>
          <div>{option.address}</div>
        </div>
      </div>
      <ArrowOutwardOutlinedIcon fontSize="large" htmlColor="grey" />
    </div>
  );
};

const GroupHeader = ({ children }) => {
  return <div className="group-header">{children}</div>;
};

export default SearchBar;
