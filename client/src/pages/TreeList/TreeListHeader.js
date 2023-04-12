import React, { useState } from 'react';
import { dataSources } from './dataArrays';
import { MenuItem, FormControl, Select } from '@mui/material';
import { useIsMobile } from '../NewTree/utilities';
import { SearchBar, searchArray } from '@/components/SearchBar/SearchBar';
import { ButtonShowHide } from '@/components/Button';
import { Toggle } from '@/components/Form';
import TreeListCheckboxes from './TreeListCheckboxes';
import './TreeList.scss';

const checkboxCategories = {
  Height: {
    category: 'height',
    options: ['small', 'medium', 'large'],
  },
  Type: {
    category: 'deciduousEvergreen',
    options: ['evergreen', 'deciduous'],
  },
};

function getActiveFilters(checkboxes) {
  return Object.entries(checkboxCategories).reduce(
    (filters, [_, filterInfo]) => {
      filters[filterInfo.category] = filterOptions(
        checkboxes,
        filterInfo.options,
      );
      return filters;
    },
    {},
  );
}

function createLookup(activeFilters) {
  const lookup = {};
  for (const [category, options] of Object.entries(activeFilters)) {
    lookup[category] = options.reduce((acc, option) => {
      acc[option.toLowerCase()] = true;
      return acc;
    }, {});
  }
  return lookup;
}

export function filterData(array, checkboxes) {
  if (Object.keys(checkboxes).length === 0) return array;
  if (array.length === 0) return array;
  const activeFilters = getActiveFilters(checkboxes);
  const lookup = createLookup(activeFilters);
  return array.filter((item) => {
    return Object.entries(lookup).every(([category, options]) => {
      if (Object.keys(options).length === 0) return true;

      const itemValue = item[category]?.toLowerCase();
      if (!itemValue) return false;
      for (const option in options) {
        if (itemValue.includes(option)) return true;
      }
      return false;
    });
  });
}

function filterOptions(checkboxes, options) {
  return options.filter((option) => checkboxes[option]);
}

const dataSourceMenuItems = dataSources.map(({ name }, value) => (
  <MenuItem key={name} value={value}>
    {name}
  </MenuItem>
));

export default function TreeListHeader({
  setFilteredData,
  setSelectedDataSourceIndex,
  selectedDataSourceIndex,
  data,
  view,
  setView,
  search,
  setSearch,
  showMore,
  setShowMore,
}) {
  const isMobile = useIsMobile();
  const [checkboxes, setCheckboxes] = useState({});

  const handleDataSourceChange = (event) => {
    localStorage.setItem('setSelectedDataSourceIndex', event.target.value);
    setSelectedDataSourceIndex(event.target.value);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    const searchSubset = searchArray(data, searchValue);
    const filteredDataNew = filterData(searchSubset, checkboxes);
    setFilteredData(filteredDataNew);
  };

  return (
    <div className="treelistheader">
      <div className="treelistheader__section">
        <div className="treelistheader__section-item">
          <FormControl>
            <SearchBar
              style={{
                div: {
                  width: 'max-content',
                  borderRadius: '4px',
                  fontSize: 'large',
                },
                input: { borderRadius: '4px', width: '100%' },
              }}
              search={search}
              onChange={handleSearch}
              placeholder={'Search trees'}
            />
          </FormControl>
          {isMobile && (
            <ButtonShowHide showMore={showMore} setShowMore={setShowMore} />
          )}
        </div>

        {showMore && (
          <div className="treelistheader__section-item">
            <Select
              mt={0}
              mb={0}
              MenuProps={{ disableScrollLock: true }}
              labelId="data-select-label"
              id="data-select"
              className="treelistheader__section-data-select"
              size="small"
              value={selectedDataSourceIndex}
              onChange={handleDataSourceChange}
            >
              {dataSourceMenuItems}
            </Select>
          </div>
        )}
        {showMore && (
          <div className="treelistheader__section-item-toggle">
            <Toggle view={view} setView={setView} />
          </div>
        )}
      </div>
      {showMore && (
        <TreeListCheckboxes
          setFilteredData={setFilteredData}
          data={data}
          search={search}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
        />
      )}
    </div>
  );
}
