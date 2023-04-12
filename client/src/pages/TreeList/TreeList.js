import React, { useState } from 'react';
import TreeListHeader from './TreeListHeader';
import TreeListCards from './TreeListCards';
import SubHeader from '@/components/SubHeader/SubHeader';
import './TreeList.scss';
import { dataSources } from '@/pages/Data/dataArrays';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import LicenseFooter from '@/pages/License/LicenseFooter';
import { useIsMobile } from '../NewTree/utilities';
import { clsx } from 'clsx';

export default function TreeList() {
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState(
    localStorage.getItem('setSelectedDataSourceIndex') || 2,
  );
  const { url, thanks, data, columns } = dataSources[selectedDataSourceIndex];
  const [filteredData, setFilteredData] = useState(data);
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(!isMobile);
  const [view, setView] = useState(localStorage.getItem('view') || 'card');
  const [search, setSearch] = useState('');

  // dynamically set padding for treelist__content on mobile
  const treeListContentStyle = clsx({
    treelist__content: showMore,
    'treelist__content-small': !showMore,
  });

  return (
    <div className="treelist">
      <div className="treelist__header">
        <SubHeader>
          <TreeListHeader
            setFilteredData={setFilteredData}
            setSelectedDataSourceIndex={setSelectedDataSourceIndex}
            selectedDataSourceIndex={selectedDataSourceIndex}
            data={data}
            view={view}
            setView={setView}
            search={search}
            setSearch={setSearch}
            showMore={showMore}
            setShowMore={setShowMore}
          />
        </SubHeader>
      </div>
      <div className={treeListContentStyle}>
        {view === 'card' && (
          <TreeListCards
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
