import React, { useState, useEffect } from 'react';
import './TreeInfo.scss';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import { dataSources } from '@/pages/Data/dataArrays';

import DownloadIcon from '@mui/icons-material/Download';
import { MenuItem, FormControl, Button, Select } from '@mui/material';
import { CSVLink } from 'react-csv';
import ListGridHeader from '@/components/ListGridHeader/ListGridHeader';
import { SearchBar, searchArray } from '@/components/SearchBar/SearchBar';
import { WttButton } from '@/components/Button/Button';

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

function filterData(array, checkboxes) {
  const activeFilters = getActiveFilters(checkboxes);
  const lookup = createLookup(activeFilters);

  // return array.filter((item) => {
  //   return Object.entries(activeFilters).every(([category, options]) => {
  //     if (options.length === 0) return true;
  //     return options.some((option) => {
  //       const itemValue = item[category].toLowerCase();
  //       const optionValue = option.toLowerCase();
  //       return itemValue.includes(optionValue);
  //     });
  //   });
  // });

  return array.filter((item) => {
    return Object.entries(lookup).every(([category, options]) => {
      if (Object.keys(options).length === 0) return true;

      const itemValue = item[category].toLowerCase();
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

// export function DataSourceMenuItems() {
//   const dataSourceMenuItems = dataSources.map(({ name }, value) => (
//     <MenuItem key={name} value={value}>
//       {name}
//     </MenuItem>
//   ));
//   console.log(dataSourceMenuItems);
//   return dataSourceMenuItems;
// }

/**
 * @param {Object} props
 * @param {Function} props.setFilteredData
 * @param {Number} props.selectedDataSourceIndex
 * @param {String} props.search
 * @param {Function} props.setSearch
 * @param {String} props.license
 * @param {Function} props.setLicense
 * @param {Object} props.openCards
 * @param {Function} props.setOpenCards
 * @param {Object} props.data
 * @param {Object} props.columns
 * @param {String} props.listType
 * @param {String} props.title
 * @param {String} props.subtitle
 * @param {String} props.description
 *  */

export default function FilterSidebar({
  setFilteredData,
  setSelectedDataSourceIndex,
  selectedDataSourceIndex,
  data,
}) {
  const [checkboxes, setCheckboxes] = useState({});
  const [search, setSearch] = useState('');

  const handleCheckboxChange = (event) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [event.target.name]: event.target.checked,
    };
    setCheckboxes(updatedCheckboxes);
    setFilteredData(filterData(data, updatedCheckboxes));
  };

  const handleChange = (event) => {
    setSelectedDataSourceIndex(event.target.value);
  };

  return (
    <div className="treeinfofilter">
      <div className="treeinfofilter__section">
        {Object.entries(checkboxCategories).map(([groupName, groupInfo]) => (
          <div key={groupName} className="treeinfofilter__section-filter">
            <h3 className="treeinfofilter__section-title">{groupName}</h3>
            <div className="treeinfofilter__section-item">
              {groupInfo.options.map((option) => (
                <label
                  key={option}
                  className="treeinfofilter__section-item-label"
                >
                  <input
                    type="checkbox"
                    name={option}
                    checked={checkboxes[option] || false}
                    onChange={handleCheckboxChange}
                    className="treeinfofilter__section-item-checkbox"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="treeinfofilter__section">
        <div className="treeinfofilter__section-data">
          <div className="treeinfofilter__section-item">
            <FormControl sx={{ minWidth: 265, my: 1 }}>
              {/* <SearchBar
                style={{
                  div: {
                    width: 'max-content',
                    borderRadius: '.3vw',
                    fontSize: 'large',
                  },
                  input: { borderRadius: '.3vw', width: '100%' },
                }}
                search={search}
                onChange={handleSearch}
                placeholder={'Search trees'}
              /> */}
              <Select
                labelId="data-select-label"
                id="data-select"
                className="treeinfofilter__section-data-select"
                size="small"
                value={selectedDataSourceIndex}
                onChange={handleChange}
              >
                {dataSourceMenuItems}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
