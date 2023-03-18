import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
        opacity: 1,
        backgroundColor: 'white',
      }}
      endAdornment={SearchIcon}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Water the Trees"
          endAdornment={SearchIcon}
        />
      )}
      renderOption={(props, option) => (
        <SearchResult props={props} option={option} />
      )}
      // renderGroup={(params) => (
      //   <li key={params.key}>
      //     <GroupHeader>{params.group}</GroupHeader>
      //     <GroupItems>{params.children}</GroupItems>
      //   </li>
      // )}
    />
  );
};

const SearchResult = ({ option, props }) => {
  return (
    <div className="search-result" {...props}>
      {option.label}
      <div className="address">{option.address}</div>
    </div>
  );
};

// const GroupHeader = () => {};

// const GroupItems = () => {};

export default SearchBar;
