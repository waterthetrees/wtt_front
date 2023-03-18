import React, { useEffect, useState } from 'react';

const checkboxFiltersArray = [
  { title: 'Size', options: ['small', 'medium', 'large'] },
  { title: 'Type', options: ['evergreen', 'deciduous'] },
  { title: 'Leaf', options: ['needle', 'broad'] },
  { title: 'Neighborhood', options: ['mission', 'sunset'] },
  { title: 'Other', options: ['flowering', 'fruiting', 'nut'] },
];

// const exampleDataArray = [
//   {
//     common: 'American Hophornbeam',
//     scientific: 'Ostrya virginiana',
//     deciduousEvergreen: 'deciduous',
//     height: 'large 40-60',
//     notes: 'Not clear if successful in SF yet. needs summer water.',
//   },
//   {
//     common: 'Apple Tree',
//     scientific: 'Malus domestica',
//     deciduousEvergreen: 'deciduous',
//     height: 'medium 20-40',
//     notes: 'flowering',
//   },
//   {
//     common: 'Ash',
//     scientific: 'Fraxinus',
//     deciduousEvergreen: 'deciduous',
//     height: 'medium 20-40',
//     notes: 'nice strong wood, no nuts',
//   },
// ];

// const exampleCheckboxes = {
//   medium: true,
//   large: true,
//   deciduous: true,
//   broad: true,
//   fruiting: false,
// };

function filterData(array, checkboxes) {
  if (!array) return;
  if (!Object.values(checkboxes).some((val) => val === true)) return array;
  if (Object.keys(checkboxes)?.length === 0) return array;

  const termsArray = Object.entries(checkboxes)
    .filter(([_, isChecked]) => isChecked)
    .map(([option]) => option.toLowerCase());

  const filteredArray = array.filter((obj) => {
    for (const key in obj) {
      const value = obj[key].toString().toLowerCase();
      if (
        obj[key] !== null &&
        termsArray.some((term) => value.includes(term))
      ) {
        return true;
      }
    }
    return false;
  });
  return filteredArray;
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
    <div className="treeinfo__filter">
      {checkboxFiltersArray.map((filter) => {
        return (
          <div key={filter.title} className="treeinfo__filter-section">
            <h3 className="treeinfo__filter-title">{filter.title}</h3>
            {filter?.options.map((option) => {
              return (
                <div key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={!!checkboxes[option]}
                    onChange={(event) =>
                      handleCheckboxChange(event, filter.title)
                    }
                    className="treeinfo__filter-checkbox"
                  />
                  <label className="treeinfo__filter-label">{option}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
