import React, { useState } from 'react';
import FilterSidebar from './TreeInfoFilter';
import TreeList from './TreeList';
import SubHeader from '@/components/SubHeader/SubHeader';
import { searchArray } from '@/components/SearchBar/SearchBar';
import './TreeInfo.scss';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';

export default function TreeInfo() {
  const [filteredData, setFilteredData] = useState(topTreesSanFrancisco);
  const [search, setSearch] = useState('');
  const dataFiltered =
    (search && searchArray(filteredData, search)) || filteredData;

  return (
    <div className="treeinfo">
      <div className="treeinfo__header">
        <SubHeader>
          <FilterSidebar setFilteredData={setFilteredData} search={search} />
        </SubHeader>
      </div>
      <TreeList data={dataFiltered} />
    </div>
  );
}
