import React from 'react';

import { Search } from '@/components/Icons';

import './SearchBar.scss';
export const SearchBar = (props) => {

  return (
    <div className="searchbar" style={{ ...props.style.div }}>
      <Search
        sx={{
          color: '#00000050',
          fontSize: '24px',
          marginLeft: '10px',
          marginRight: '10px',
          fontFamily: 'Montserrat',
        }}
      />

      <input
        style={{ ...props.style.input }}
        value={props.search}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="searchbar__input"
      />
    </div>
  );
};
