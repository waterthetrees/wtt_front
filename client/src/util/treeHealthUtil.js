// Names and colors for the various health states are defined by arrays of:
//  - string for the health state's name
//  - boolean for whether trees in this state can be maintained
//  - fill color string for the tree circle
//  - optional stroke color string for the circle, which defaults to the fill color
// The state's value (returned as healthNum by the API) is defined by its index in this array.
const healthInfo = [
  ['vacant', false, '#c0c0c0'],
  ['dead', false, '#bb0000'],
  ['missing', false, 'black'],
  ['stump', false, '#f1c27d'],
  ['poor', true, '#be9b7b'],
  ['fair', true, '#96b347'],
  ['good', true, '#309000'],
];
const maxValue = healthInfo.length - 1;

const healthByName = healthInfo.reduce(
  (result, [name, maintainable, fill, stroke = fill], i) => ({
    ...result,
    [name]: {
      key: name,
      value: i,
      maintainable,
      fill,
      stroke,
    },
  }),
  {},
);

// If the health isn't between 0 and 6, default to the good color.
healthByName.default = healthByName.good;

export const treeHealthUtil = {
  getNameByValue(value) {
    const index = this.getNormalizedValue(value);

    return healthInfo[index][0];
  },
  getNormalizedValue(value) {
    const index = parseInt(value, 10);

    // If value is out of bounds for health, return the default value.
    return index >= 0 && index <= maxValue ? index : healthByName.default.value;
  },
  getValueByName(name) {
    return (healthByName[name] || healthByName.default).value;
  },
  getNameValuePairs() {
    return healthInfo.map(([name], value) => [name, value]);
  },
  getColorByName(name, colorType) {
    return (healthByName[name] || healthByName.default)[colorType];
  },
  getPaintColors(colorType) {
    const colors = healthInfo.reduce(
      (result, [name]) => [...result, name, healthByName[name][colorType]],
      [],
    );

    colors.push(healthByName.default[colorType]);

    return colors;
  },
  isMaintainable(health) {
    return healthByName[health]?.maintainable || false;
  },
};

export function capFirstLetter(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}
