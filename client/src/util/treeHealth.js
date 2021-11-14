// Names and colors for the various health states are defined by arrays of:
//  - string for the health state's name
//  - boolean for whether trees in this state can be maintained
//  - fill color string for the tree circle
//  - optional stroke color string for the circle, which defaults to the fill color
// The state's value (returned as healthNum by the API) is defined by its index in this array.
const healthInfo = [
  ['vacant', false, '#808080'],
  ['dead', false, 'black', 'black'],
  ['missing', false, 'white', '#c68642'],
  ['stump', false, '#f1c27d'],
  ['poor', true, '#be9b7b'],
  ['fair', true, '#889944'],
  ['good', true, '#309000'],
];
const maxValue = healthInfo.length - 1;

const healthByName = healthInfo.reduce((result, [name, maintainable, fill, stroke = fill], i) => {
  result[name] = {
    key: name, value: i, maintainable, fill, stroke,
  };

  return result;
}, {});

// If the health isn't between 0 and 6, default to the good color.
healthByName.default = healthByName.good;

export const treeHealth = {
  getNameByValue(value) {
    const index = parseInt(value, 10);

    return (index >= 0 && index <= maxValue)
      ? healthInfo[index][0]
      : 'good';
  },
  getNameValuePairs() {
    return healthInfo.map(([name], value) => [name, value]);
  },
  getColorByName(name, colorType) {
    return healthByName[name][colorType];
  },
  getPaintColors(colorType) {
    const colors = healthInfo.reduce((result, [name]) =>
      result.push(name, healthByName[name][colorType]) && result, []);

    colors.push(healthByName.default[colorType]);

    return colors;
  },
  isMaintainable(health) {
    return healthByName[health]?.maintainable || false;
  },
};
