import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Footer } from '@/components/Footer/Footer';
import Communities from './Communities';
import './Community.scss';

export default function Community() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="community">
      <h1>Community</h1>
      <div className="community__main">
        <div className="community__main__p">
          Discover local tree planting, maintaining, meetup events or find a
          local tree group to join!
        </div>
        <div className="community__main__search">
          <SearchBar
            style={{
              div: { width: '60%', borderRadius: '.3vw' },
              input: { borderRadius: '.3vw' },
            }}
            setSearchValue={setSearchValue}
            placeholder={'Search Tree Planting Groups'}
          />
        </div>
        <Communities searchValue={searchValue} />
      </div>
      <Footer />
    </div>
  );
}
