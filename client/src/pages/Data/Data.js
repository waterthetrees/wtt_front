import React, { useState } from 'react';

import DataHeader from './DataHeader';
import LicenseFooter from '@/pages/License/LicenseFooter';
import './Data.scss';
import { searchArray } from '@/components/SearchBar/SearchBar';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import { dataSources } from '@/pages/Data/dataArrays';

export default function Data() {
  const [search, setSearch] = useState('');
  const [license, setLicense] = useState('');
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(0);
  const { data, columns } = dataSources[selectedDataSourceIndex];

  const dataFiltered = (search && searchArray(data, search)) || data;

  return (
    <div className="data">
      <DataHeader
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
