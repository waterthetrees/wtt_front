import React from 'react';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import './ListGridHeader.scss';

export default function ListGridHeader({
  search,
  setSearch,
  title,
  description,
  children,
  searchLabel,
}) {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="listgridheader">
      <div className="listgridheader-title">
        <h2>{title}</h2>
        <h5>{description}</h5>
        <div className="listgridheader-search">
          <SearchBar
            style={{
              div: {
                width: 'max-content',
                borderRadius: '.3vw',
                fontSize: 'large',
              },
              input: { borderRadius: '.3vw', width: '100%' },
            }}
            search={search}
            onChange={handleSearch}
            placeholder={searchLabel}
          />
        </div>
      </div>
      <div className="listgridheader-content">{children}</div>
    </div>
  );
}
