import React from 'react';
import { Search } from '@/components/Icons';
import './SearchBar.scss';

export const SearchBar = ({
  searchValue,
  style,
  placeholder,
  setSearchValue,
}) => {
  const handleSearch = (event) => setSearchValue(event.target.value);
  return (
    <div className="searchbar" style={{ ...style.div }}>
      <label htmlFor="searchbar">
        <Search
          sx={{
            color: '#00000050',
            fontSize: '24px',
            marginLeft: '10px',
            marginRight: '10px',
            fontFamily: 'Montserrat',
          }}
        />
      </label>

      <input
        id="searchbar"
        style={{ ...style.input }}
        value={searchValue}
        onSubmit={handleSearch}
        placeholder={placeholder}
        className="searchbar__input"
      />
    </div>
  );
};
