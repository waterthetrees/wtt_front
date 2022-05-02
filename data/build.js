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
  'American black bear',
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
    .replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, (match) => match.replace(/"/g, ''));
}

function toTitleCase(string) {
  return string.replace(/([^\W_]+[^\s-]*) */g, (word) => word.charAt(0).toUpperCase()
    + word.slice(1));
}

function createTreeSorter(name) {
  const index = { common: 0, scientific: 1, genus: 2 }[name];

  return (a, b) => {
    const aName = a.sort[index];
    const bName = b.sort[index];

    if (aName === bName) {
      return 0;
    } else if (aName < bName) {
      return -1;
    } else {
      return 1;
    }
  };
}

async function buildScientificNameToImageMap(names) {
  function partition(arr, size) {
    const numGroups = Math.ceil(arr.length / size);
    const groups = new Array(numGroups).fill(null);

    return groups.map((_, i) => arr.slice(i * size, i * size + size));
  }

  function buildRequestURL(titles) {
    const BASE_URL = 'https://en.wikipedia.org/w/api.php';
    const requestURL = new URL(BASE_URL);
    requestURL.search = new URLSearchParams({
      action: 'query',
      format: 'json',
      prop: 'pageimages',
      piprop: 'thumbnail',
      pithumbsize: '600',
      titles,
    });

    return requestURL;
  }

  function getRequestURLs(data) {
    const MAX_TITLES_PER_QUERY = 50;
    const partitions = partition(data, MAX_TITLES_PER_QUERY);
    const queryTitles = partitions.map((titles) => titles.join('|'));
    const queries = queryTitles.map((titles) => buildRequestURL(titles));
    return queries.map((query) => query.href);
  }

  async function getResponseJSON(url) {
    const response = await fetch(url);
    return response.json();
  }

  async function getImages(requestURLs) {
    const images = {};
    const responsesMap = requestURLs.map((url) => getResponseJSON(url));
    const responses = await Promise.all(responsesMap);
    const allPages = responses.reduce((accumulator, response) => {
      const { query: { pages = [] } = {} } = response;
      return accumulator.concat(...Object.values(pages));
    }, []);

    Object.values(allPages).forEach((page) => {
      const { title, thumbnail: { source } = {} } = page;
      images[title] = source;
    });

    const allNormalized = responses.reduce((accumulator, response) => {
      const { query: { normalized = [] } = {} } = response;
      return accumulator.concat(...normalized);
    }, []);

    allNormalized.forEach(({ from, to }) => {
      images[from] = images[to];
      delete images[to];
    });

    return images;
  }

  const requestURLs = getRequestURLs(names);
  return getImages(requestURLs);
}

const trees = [];
const processedTrees = {};

// Ignore the Alameda file, since it doesn't include trees.
const jsonFiles = fs.readdirSync(dataPath)
  .filter((filename) => jsonPattern.test(filename) && !ignoreFilePattern.test(filename));

ignoreError(() => fs.rmSync(outputPath, { recursive: true }), 'ENOENT');
ignoreError(() => fs.mkdirSync(outputPath), 'EEXIST');

jsonFiles.forEach((filename) => {
  const { data } = require(path.resolve(dataPath, filename));
  const name = filename.match(jsonPattern)[1];

  // Convert each tree JSON file to a .js file that exports the array of items as a module.
  writeJSTemplate(name, data);

  // Combine the trees into one deduped list, normalizing the names.
  data.forEach(({ common, scientific, genus }) => {
    const commonTitleCase = toTitleCase(common);
    const lcNames = [common, scientific, genus]
      .map((name) => name.toLowerCase().replace(/[^\w\s]/g, ''));
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

async function buildImagesMap(trees) {
  const scientificNames = trees.map((tree) => tree.scientific);
  const uniqueScientificNames = [...new Set(scientificNames)];
  return buildScientificNameToImageMap(uniqueScientificNames);
}

buildImagesMap(trees).then((data) => {
  const formattedData = JSON.stringify(data, null, 2);
  const filename = 'treeImages.json';
  const output = path.resolve(outputPath, filename);
  console.log(`[build:data] Writing ${filename}.`);
  fs.writeFileSync(output, formattedData);
});

writeJSTemplate('trees', trees.sort(createTreeSorter('common')));
