export const saveTimer = 800;

export const getHealthColor = (health) => ({
  good: 'green',
  fair: 'orange',
  poor: 'red',
  dead: 'black',
  vacant: '#7c501a',
  missing: '#7c501a',
  concrete: '#808080',
  stump: 'brown',
}[health]);

export const convertSliderValuesToHealth = (value) => {
  const numValue = parseInt(value, 10);
  if (numValue === 6) return 'good';
  if (numValue === 5) return 'fair';
  if (numValue === 4) return 'poor';
  if (numValue === 3) return 'stump';
  if (numValue === 2) return 'missing';
  if (numValue === 1) return 'dead';
  if (numValue === 0) return 'vacant';
  return 'good';
};

export const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};

// export const createFeature = (common, health, idTree, coordinates) => ({
//   id: 'treedata',
//   geometry: coordinates,
//   properties: {
//     common,
//     health,
//     id: idTree,
//     idTree,
//   },
// });
