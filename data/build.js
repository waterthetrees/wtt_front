const fs = require('fs');
const path = require('path');

const jsonPattern = /(.+)\.json$/;
const dataPath = path.resolve(__dirname, 'json');
const outputPath = path.resolve(__dirname, '../client/src/data/dist');
const jsTemplate = (name, data) => `export const ${name} = ${toSource(data)};\n`;
const ignoreFilePattern = /alameda/i;
const ignoreCommonPattern = new RegExp([
  'fungus',
  'mushroom',
  'turtle',
  'rainbow trout',
  'waterfowl',
  'chanterelle',
  'crayfish',
  'squirrel',
  'moss',
  'red-eared slider',
  '-cap',
].join('|'), 'i');
// We need to ignore 'fish' by matching the full scientific name, as some actual trees have 'fish'
// in their common names.
const ignoreScientificPattern = new RegExp(`^(${[
  'chordata',
].join('|')})$`, 'i');

function writeJSTemplate(name, data) {
  const filename = `${name}.js`;
  const filePath = path.resolve(outputPath, filename);

  console.log(`[build:data] Writing ${filename}.`);

  return fs.writeFileSync(filePath, jsTemplate(name, data), 'utf8');
}

function ignoreError(func, code) {
  // Ignore non-fatal errors.
  try {
    func();
  } catch (e) {
    if (e.code !== code) {
      throw e;
    }
  }
}

function toSource(obj) {
  // Strip the quotes off stringified object keys.
  return JSON.stringify(obj, null, 2)
    .replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, match => match.replace(/"/g, ""));
}

function toTitleCase(string) {
  return string.replace(/([^\W_]+[^\s-]*) */g, word => word.charAt(0).toUpperCase() +
    word.slice(1));
}

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

const trees = [];
const processedTrees = {};

// Ignore the Alameda file, since it doesn't include trees.
const jsonFiles = fs.readdirSync(dataPath)
  .filter(filename => jsonPattern.test(filename) && !ignoreFilePattern.test(filename));

ignoreError(() => fs.rmSync(outputPath, { recursive: true }), 'ENOENT');
ignoreError(() => fs.mkdirSync(outputPath), 'EEXIST');

jsonFiles.forEach(filename => {
  const { data } = require(path.resolve(dataPath, filename));
  const name = filename.match(jsonPattern)[1];

  // Convert each tree JSON file to a .js file that exports the array of items as a module.
  writeJSTemplate(name, data);

  // Combine the trees into one deduped list, normalizing the names.
  data.forEach(({ common, scientific, genus }) => {
    const commonTitleCase = toTitleCase(common);
    const lcNames = [common, scientific, genus]
      .map(name => name.toLowerCase().replace(/[^\w\s]/g, ''));
    const key = lcNames.join('');

    // Ignore dupes in the data, as well as things that aren't trees, like fungus and rainbow trout.
    if (
      !processedTrees[key]
      && !ignoreCommonPattern.test(commonTitleCase)
      && !ignoreScientificPattern.test(scientific)
    ) {
      trees.push({
        common: commonTitleCase,
        scientific,
        genus,
        // Store the lowercased names on each tree, so that we can sort by those strings.  They
        // don't include non-letter characters, so names like `"Ohi" A Lehua` won't get sorted to
        // the front of the list.
        sort: lcNames,
      });
      processedTrees[key] = true;
    }
  });
});

writeJSTemplate('trees', trees.sort(createTreeSorter('common')));
