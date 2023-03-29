import React, { useState } from 'react';
import FilterSidebar from './TreeInfoFilter';
import TreeList from './TreeList';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import { WttButton } from '@/components/Button/Button';
import './TreeInfo.scss';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';

export default function TreeInfo() {
  const [filteredData, setFilteredData] = useState(topTreesSanFrancisco);
  const [filterOpen, setFilterOpen] = useState(true);
  const handleClose = () => setFilterOpen(false);
  const handleOpen = () => setFilterOpen(true);

  return (
    <div className="treeinfo">
      <div className="treeinfo__header">
        {filterOpen === false && (
          <WttButton onClick={handleOpen}>Filter Trees</WttButton>
        )}
        <PanelDrawer
          title="Filter Trees"
          width={150}
          open={filterOpen}
          onClose={handleClose}
          padding={0}
        >
          <FilterSidebar setFilteredData={setFilteredData} />
        </PanelDrawer>
      </div>
      <TreeList data={filteredData} />
    </div>
  );
}
