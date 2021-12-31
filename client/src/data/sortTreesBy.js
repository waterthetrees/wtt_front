function createTreeSorter(name) {
  const index = { common: 0, scientific: 1, genus: 2 }[name];

  return function(a, b) {
    const aName = a.sort[index];
    const bName = b.sort[index];

    if (aName === bName) {
      return 0;
    } else if (aName < bName) {
      return -1;
    } else {
      return 1;
    }
  }
}

export default {
  common: createTreeSorter('common'),
  scientific: createTreeSorter('scientific'),
  genus: createTreeSorter('genus'),
};
