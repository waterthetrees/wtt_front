import React, { useState, useEffect } from 'react';
import './TreeInfo.scss';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';

const checkboxCategories = {
  Size: {
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

export default function FilterSidebar({ setFilteredData }) {
  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (event) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [event.target.name]: event.target.checked,
    };
    setCheckboxes(updatedCheckboxes);
    setFilteredData(filterData(topTreesSanFrancisco, updatedCheckboxes));
  };

  return (
    <div className="treeinfofilter">
      {Object.entries(checkboxCategories).map(([groupName, groupInfo]) => (
        <div key={groupName} className="treeinfofilter__section">
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
  );
}
