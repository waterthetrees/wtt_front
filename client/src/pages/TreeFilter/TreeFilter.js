import React, { useState } from 'react';

import TreeFilterHeader from './TreeFilterHeader';
import LicenseFooter from '@/pages/License/LicenseFooter';
import './TreeFilter.scss';
import { searchArray } from '@/components/SearchBar/SearchBar';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import { dataSources } from '@/pages/Data/dataArrays';

export default function TreeFilter() {
  const [search, setSearch] = useState('');
  const [license, setLicense] = useState('');
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(0);
  const { data, columns } = dataSources[selectedDataSourceIndex];
  const [openCards, setOpenCards] = useState({});

  const dataFiltered = (search && searchArray(data, search)) || data;

  return (
    <div className="data">
      <TreeFilterHeader
        search={search}
        setSearch={setSearch}
        selectedDataSourceIndex={selectedDataSourceIndex}
        setSelectedDataSourceIndex={setSelectedDataSourceIndex}
      />

      <ListGrid data={dataFiltered} columns={columns} listType="data" />

      <LicenseFooter license={license} />
    </div>
  );
}
