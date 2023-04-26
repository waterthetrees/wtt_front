import React from 'react';

import { searchArray } from '@/components/SearchBar/SearchBar';

import { filterData } from './TreeListHeader';

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

export default function TreeListFilters({
  setFilteredData,
  data,
  search,
  setCheckboxes,
  checkboxes,
}) {
  const handleCheckboxChange = (event) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [event.target.name]: event.target.checked,
    };
    // set localStorage before state for persistence before re-render
    localStorage.setItem('checkboxes', updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
    const filteredDataNew = filterData(data, updatedCheckboxes);
    const searchSubset = searchArray(filteredDataNew, search);
    setFilteredData(searchSubset);
  };

  return (
    <div className="treelistfilters">
      {Object.entries(checkboxCategories).map(([groupName, groupInfo]) => (
        <div key={groupName} className="treelistfilters__filter">
          <h3 className="treelistfilters__filter-title">{groupName}:</h3>
          <div className="treelistfilters__filter-item">
            {groupInfo.options.map((option) => (
              <label
                aria-labelledby={option}
                key={option}
                className="treelistfilters__filter-item-label"
              >
                <input
                  id={option}
                  type="checkbox"
                  name={option}
                  checked={checkboxes[option] || false}
                  onChange={handleCheckboxChange}
                  className="treelistfilters__filter-item-checkbox"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
