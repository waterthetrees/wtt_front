import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import './SearchBar.scss';

const MAX_QUERY_LENGTH = 250;

const SearchBar = ({
  className,
  loading,
  options,
  handleInputChange,
  handleOptionSelect,
}) => {
  return (
    <Autocomplete
      className={className}
      id="searchbar-input"
      autoHighlight
      loading={loading}
      freeSolo
      options={options}
      onChange={handleOptionSelect}
      filterOptions={(option) => option}
      groupBy={(option) => option.type}
      sx={{
        backgroundColor: 'white',
        borderRadius: '4px',
        '& #searchbar-input': {
          padding: '4px',
        },
        '& .MuiAutocomplete-endAdornment': {
          position: 'unset',
        },
      }}
      ListboxProps={{
        sx: { maxHeight: '60vh' },
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
            inputProps={{
              ...params.inputProps,
              maxLength: MAX_QUERY_LENGTH,
            }}
            onChange={handleInputChange}
          />
        );
      }}
      renderOption={(props, option) => {
        return <SearchResult props={props} option={option} key={option.id} />;
      }}
      renderGroup={(params) => {
        return (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            {params.children}
          </li>
        );
      }}
    />
  );
};

const SearchResult = ({ option, props }) => {
  // Special options like "No results found"
  if (!option.type) {
    return <div className="no-results">{option.label}</div>;
  }

  return (
    <div
      {...props}
      className={`${props.className} search-result`}
      key={option.id}
    >
      <div className="left-container">
        <PlaceOutlinedIcon fontSize="large" htmlColor="grey" />
        <div className="result-info">
          <div>{option.label}</div>
          <div className="address">{option.address}</div>
        </div>
      </div>
      <ArrowOutwardOutlinedIcon fontSize="large" htmlColor="grey" />
    </div>
  );
};

const GroupHeader = ({ children }) => {
  if (!children) {
    return null;
  }
  return <div className="group-header">{children}</div>;
};

export default SearchBar;
