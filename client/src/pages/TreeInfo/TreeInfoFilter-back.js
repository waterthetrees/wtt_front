import React, { useEffect, useState } from 'react';

const checkboxFiltersArray = {
  Size: {
    category: 'height',
    options: ['small', 'medium', 'large'],
  },
  Type: {
    category: 'deciduousEvergreen',
    options: ['evergreen', 'deciduous'],
  },
};

const exampleDataArray = [
  {
    scientific: 'Ostrya virginiana',
    deciduousEvergreen: 'deciduous',
    height: 'large 40-60',
  },
  {
    scientific: 'Malus domestica',
    deciduousEvergreen: 'deciduous',
    height: 'medium 20-40',
  },
  {
    scientific: 'Fraxinus',
    deciduousEvergreen: 'evergreen',
    height: 'small 10-20',
  },
];

// const exampleCheckboxes = {
//   medium: true,
//   large: true,
//   deciduous: true,
//   broad: true,
//   fruiting: false,
// };

// function filterDataEarlyReturn(array, checkboxes) {
//   if (!array) return [];
//   if (!Object.values(checkboxes).some((val) => val === true)) return array;
//   if (Object.keys(checkboxes)?.length === 0) return array;
//   return false;
// }

// function filterData(array, checkboxes) {
//   // if (!array) [];
//   // if (!Object.values(checkboxes).some((val) => val === true)) return array;
//   // if (Object.keys(checkboxes)?.length === 0) return array;
//   if (filterDataEarlyReturn(array, checkboxes)?.length) return array;

//   const termsArray = Object.entries(checkboxes)
//     .filter(([_, isChecked]) => isChecked)
//     .map(([option]) => option.toLowerCase());
//   // console.log(termsArray, 'termsArray');

//   const activeFilters = Object.entries(getActiveFilters(checkboxes)).filter(
//     ([_, val]) => val.length > 0,
//   );
//   console.log('activeFilters', activeFilters);

//   const filteredArray = array.filter((obj) => {
//     Object.entries(activeFilters).filter(([category, activeOptions]) => {
//       const values = activeOptions.map((option) => {
//         // console.log('obj', obj);
//         // console.log('option', option);
//         console.log('category', category);
//         // return obj[category][option];
//       });
//       return false;
//     });
//   });
//   // const values = Object.values(obj).join(' ').toLowerCase();
//   // if (!values) return;
//   // console.log('\n\n values', values);
//   // const everyValue = termsArray.every((term) => values.includes(term));
//   // console.log('everyValue', everyValue);
//   // return everyValue;
//   // return false;
//   // for (const key in obj) {
//   //   const value = obj[key].toString().toLowerCase();
//   //   // console.log(value, 'value');
//   //   if (
//   //     obj[key] !== null &&
//   //     termsArray.every((term) => value.includes(term))
//   //   ) {
//   //     return true;
//   //   }
//   // }

//   return filteredArray;
// }

// function getActiveFilters(checkboxes) {
//   return {
//     size: ['small', 'medium', 'large'].filter((option) => checkboxes[option]),
//     type: ['evergreen', 'deciduous'].filter((option) => checkboxes[option]),
//     leaf: ['needle', 'broad'].filter((option) => checkboxes[option]),
//     neighborhood: ['mission', 'sunset'].filter((option) => checkboxes[option]),
//     other: ['flowering', 'fruiting', 'nut'].filter(
//       (option) => checkboxes[option],
//     ),
//   };
// }

const categories = {
  size: ['small', 'medium', 'large'],
  type: ['evergreen', 'deciduous'],
  leaf: ['needle', 'broad'],
  neighborhood: ['mission', 'sunset'],
  other: ['flowering', 'fruiting', 'nut'],
};

// function filterOptions(checkboxes, optionsArray) {
//   return optionsArray.filter((option) => checkboxes[option]);
// }

// function getActiveFilters(checkboxes) {
//   const filtered = Object.entries(categories).map(([category, options]) => [
//     category,
//     filterOptions(checkboxes, options),
//   ]);
//   console.log('filtered', filtered);
//   return Object.fromEntries(filtered);
// }

// function filterData(array, checkboxes) {
//   if (!array) return;
//   if (!Object.values(checkboxes).some((val) => val === true)) return array;
//   if (Object.keys(checkboxes)?.length === 0) return array;

//   const activeFilters = getActiveFilters(checkboxes);

//   const filteredArray = array.filter((obj) => {
//     for (const category in activeFilters) {
//       const activeOptions = activeFilters[category];
//       if (activeOptions.length === 0) continue;

//       if (matchCategory(obj, activeOptions, category)) {
//         return true;
//       }
//     }
//     return false;
//   });

//   return filteredArray;
// }

function filterData(array, checkboxes) {
  const checkboxFiltersArray = {
    Size: {
      category: 'height',
      options: ['small', 'medium', 'large'],
    },
    Type: {
      category: 'deciduousEvergreen',
      options: ['evergreen', 'deciduous'],
    },
  };

  const activeFilters = Object.entries(checkboxFiltersArray).reduce(
    (filters, [_, filterInfo]) => {
      filters[filterInfo.category] = filterOptions(
        checkboxes,
        filterInfo.options,
      );
      return filters;
    },
    {},
  );

  return array.filter((item) => {
    return Object.entries(activeFilters).every(([category, options]) => {
      if (options.length === 0) {
        return true;
      }
      return options.some((option) => {
        return item[category].toLowerCase().includes(option.toLowerCase());
      });
    });
  });
}

function filterOptions(checkboxes, options) {
  return options.filter((option) => checkboxes[option]);
}

export default function TreeInfoFilter({
  data,
  filteredData,
  setFilteredData,
}) {
  const [checkboxes, setCheckboxes] = useState({});
  const [newChecks, setNewChecks] = useState(false);

  const handleCheckboxChange = (event, title) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    const newCheckboxes = { ...checkboxes, [name]: value };
    setCheckboxes(newCheckboxes);
    setFilteredData(filterData(data, newCheckboxes));
    setNewChecks(true);
  };

  return (
    <div className="treeinfofilter">
      {Object.entries(checkboxFiltersArray).map((filter) => {
        return (
          <div key={filter.title} className="treeinfofilter__section">
            <h3 className="treeinfofilter__section-title">{filter.title}</h3>
            <div className="treeinfofilter__section-item">
              {filter?.options.map((option) => {
                return (
                  <label
                    className="treeinfofilter__section-item-label"
                    key={option}
                  >
                    <input
                      type="checkbox"
                      name={option}
                      checked={!!checkboxes[option]}
                      onChange={(event) =>
                        handleCheckboxChange(event, filter.title)
                      }
                      className="treeinfofilter__section-item-checkbox"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
