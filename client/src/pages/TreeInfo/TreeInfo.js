import React, { useEffect, useState } from 'react';
import FilterSidebar from './TreeInfoFilter';
import TreeList from './TreeList';
import SubHeader from '@/components/SubHeader/SubHeader';
import { searchArray } from '@/components/SearchBar/SearchBar';
import './TreeInfo.scss';
import { dataSources } from '@/pages/Data/dataArrays';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import LicenseFooter from '@/pages/License/LicenseFooter';

// function searching(search, data) {
//   if (!search) return data;
//   const searchData = searchArray(data, search);
//   return searchData;
// }

export default function TreeInfo() {
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(2);

  const { url, thanks, data, title, columns } =
    dataSources[selectedDataSourceIndex];
  const [filteredData, setFilteredData] = useState(data);

  const [view, setView] = useState('card');
  const [search, setSearch] = useState('');

  // useEffect(() => {

  // }, [search, selectedDataSourceIndex, data, filteredData]);

  // useEffect(() => {
  //   setFilteredData(data);
  // }, [selectedDataSourceIndex, data]);

  return (
    <div className="treeinfo">
      <div className="treeinfo__header">
        <SubHeader>
          <FilterSidebar
            setFilteredData={setFilteredData}
            setSelectedDataSourceIndex={setSelectedDataSourceIndex}
            selectedDataSourceIndex={selectedDataSourceIndex}
            data={data}
            view={view}
            setView={setView}
            search={search}
            setSearch={setSearch}
          />
        </SubHeader>
      </div>
      <div className="treeinfo__content">
        {view === 'card' && (
          <TreeList
            data={filteredData}
            selectedDataSourceIndex={selectedDataSourceIndex}
          />
        )}
        {view === 'list' && (
          <ListGrid data={filteredData} columns={columns} listType="data" />
        )}
      </div>

      <LicenseFooter>
        <a href={url} target="_blank" rel="noreferrer">
          {thanks}
        </a>
      </LicenseFooter>
    </div>
  );
}
