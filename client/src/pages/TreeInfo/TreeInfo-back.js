import React, { useState } from 'react';
import { Card } from '../../components/Cards/Card';
import TreeInfoFilter from './TreeInfoFilter';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import { NavLink } from 'react-router-dom';
import { WttButton } from '@/components/Button/Button';
import './TreeInfo.scss';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
console.log(topTreesSanFrancisco, 'topTreesSanFrancisco');
const routeName = 'treeinfo';

export default function TreeInfo() {
  const [data, setData] = useState(topTreesSanFrancisco);

  const [filteredData, setFilteredData] = useState(data);
  const [filterOpen, setFilterOpen] = useState(true);
  const handleClose = () => setFilterOpen(false);
  const handleOpen = () => setFilterOpen(true);
  const dataList = filteredData?.length > 0 ? filteredData : data;

  return (
    <div className="treeinfo">
      <div className="treeinfo__filter-header">
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
          <TreeInfoFilter
            data={data}
            setData={setData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        </PanelDrawer>
      </div>
      <div className="treeinfo__list">
        {dataList &&
          dataList.map((tree, index) => {
            const nameFormatted = tree?.common.toLowerCase().replace(/ /g, '-');
            const urlRoute = `/${routeName}/${nameFormatted}`;
            const { notes, ...treeRest } = tree;
            return (
              <NavLink
                className="treeinfo__link"
                to={{
                  pathname: urlRoute,
                }}
                state={tree}
                key={`${tree?.scientific}-${index}`}
              >
                <Card {...treeRest} />
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}
