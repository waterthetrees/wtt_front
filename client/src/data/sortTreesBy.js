function createTreeSorter(name) {
  const index = { common: 0, scientific: 1, genus: 2 }[name];
  const collator = new Intl.Collator('en', {
    usage: 'sort',
    sensitivity: 'base',
    ignorePunctuation: true,
    numeric: true,
    caseFirst: 'upper',
  });

  return (a, b) => collator.compare(a.sort[index], b.sort[index]);
}

export default {
  common: createTreeSorter('common'),
  scientific: createTreeSorter('scientific'),
  genus: createTreeSorter('genus'),
};
