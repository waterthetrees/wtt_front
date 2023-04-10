import React, { useState } from 'react';
import FilterSidebar from './TreeInfoFilter';
import TreeList from './TreeList';
import SubHeader from '@/components/SubHeader/SubHeader';
import './TreeInfo.scss';
import { dataSources } from '@/pages/Data/dataArrays';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import LicenseFooter from '@/pages/License/LicenseFooter';

export default function TreeInfo() {
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(2);

  const { url, thanks, data, title, columns } =
    dataSources[selectedDataSourceIndex];
  const [filteredData, setFilteredData] = useState(data);

  const [view, setView] = useState('card');
  const [search, setSearch] = useState('');

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
