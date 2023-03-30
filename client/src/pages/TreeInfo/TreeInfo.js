import React, { useEffect, useState } from 'react';
import FilterSidebar from './TreeInfoFilter';
import TreeList from './TreeList';
import SubHeader from '@/components/SubHeader/SubHeader';
import { searchArray } from '@/components/SearchBar/SearchBar';
import './TreeInfo.scss';
import { dataSources } from '@/pages/Data/dataArrays';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';

export default function TreeInfo() {
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(2);

  const { url, thanks, data } = dataSources[selectedDataSourceIndex];
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [selectedDataSourceIndex, data]);

  return (
    <div className="treeinfo">
      <div className="treeinfo__header">
        <SubHeader>
          <FilterSidebar
            setFilteredData={setFilteredData}
            setSelectedDataSourceIndex={setSelectedDataSourceIndex}
            selectedDataSourceIndex={selectedDataSourceIndex}
            data={data}
          />
        </SubHeader>
      </div>
      <TreeList data={filteredData} />
      <div className="treeinfofilter__section-item">
        <a href={url} target="_blank" rel="noreferrer">
          {thanks}
        </a>
      </div>
    </div>
  );
}
