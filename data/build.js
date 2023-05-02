// TODO - refactor and break up this file

const fs = require('fs');
const path = require('path');

// const { toTitleCase } = Promise.all([import('@/util/stringUtils')]).then(
//   ([{ default: toTitleCase }]) => ({ toTitleCase }),
// );

const featureFlags = {
  downloadImages: true,
};
const jsonPattern = /(.+)\.json$/;
const dataPath = path.resolve(__dirname, 'json');
const outputPath = path.resolve(__dirname, '../client/src/data/dist');
const jsTemplate = (name, data) =>
  `export const ${name} = ${toSource(data)};\n`;
const ignoreFilePattern = /alameda/i;
const ignoreCommonPattern = new RegExp(
  [
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
  ].join('|'),
  'i',
);
// We need to ignore 'fish' by matching the full scientific name, as some actual trees have 'fish'
// in their common names.
const ignoreScientificPattern = new RegExp(
  `^(${['chordata'].join('|')})$`,
  'i',
);

function writeJSTemplate(name, data) {
  const filename = `${name}.js`;
  const filePath = path.resolve(outputPath, filename);

  console.info(`[build:data] Writing ${filename}.`);

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
  return JSON.stringify(obj, null, 2).replace(
    /^[\t ]*"[^:\n\r]+(?<!\\)":/gm,
    (match) => match.replace(/"/g, ''),
  );
}

// // TODO use functions from utils/stringUtils.js once this is es6
// // Common Names should be title case. All major words are capitalized, while minor words are lowercased
function toTitleCase(str) {
  if (!str) return '';
  const wordsToSkip = ['of', 'and', 'the', 'in', 'on'];

  return str
    .toLowerCase()
    .split(/\s+/) // Split on one or more spaces
    .filter((word) => word) // Filter out empty strings
    .map(function (word, index) {
      if (wordsToSkip.includes(word) && index !== 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// TODO use functions from utils/stringUtils.js once this is es6
// Cultivar should be title case and in single quotes.
function formatCultivar(cultivar) {
  if (!cultivar) return '';
  const cultivarWithoutQuotes = cultivar.replace(/["']/g, '');
  const titleCasedCultivar = toTitleCase(cultivarWithoutQuotes);
  return ` '${titleCasedCultivar}'`;
}

// TODO use functions from utils/stringUtils.js once this is es6
/**
 * Formats a scientific name. The Genus name is always capitalized,
 * Species name and any infraspecific epithets are written in lowercase.
 * Cultivar should be capitalized and in single quotes.
 * All should be typically italicized.
 * @see {@link https://en.wikipedia.org/wiki/Binomial_nomenclature}
 *
 * @param {string} scientificName - The scientific name of the tree
 * @returns {string} - The formatted scientific name
 *
 * @example
 * // returns 'Acer rubrum'
 * formatScientificName('Acer rubrum')
 *
 * @example
 * // returns 'Quercus alba'
 * formatScientificName('Quercus alba')
 *
 * @example
 * // returns 'Picea abies \'Nidiformis\''
 * formatScientificName('Picea abies "Nidiformis"')
 */
function formatScientificName(scientificName) {
  if (!scientificName) return '';

  const [firstPart, cultivar] = scientificName
    .trim()
    .replace(/["]/g, "'") // replace double quotes with single quotes
    .replace(/[']/, "----cultivarsplit'") // Add in ----cultivarsplit' to use for splitting quoted cultivar out of name
    .split('----cultivarsplit');

  const formattedCultivar = cultivar ? formatCultivar(cultivar) : '';
  const [genus, species, ...epithet] = firstPart.trim().split(' ');

  const formattedGenus = genus
    ? genus.charAt(0).toUpperCase() + genus.slice(1).toLowerCase()
    : '';

  const formattedSpecies = species ? ` ${species.toLowerCase()}` : '';

  const formattedEpithet = epithet?.length
    ? ` ${epithet.join(' ').toLowerCase()}`
    : '';

  return `${formattedGenus}${formattedSpecies}${formattedEpithet}${formattedCultivar}`;
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
      piprop: 'thumbnail',
      titles: titles,
      utf8: '1',
      origin: '*',
      formatversion: '2',
      pithumbsize: '600',
      exintro: 'true',
      explaintext: 'true',
      prop: 'info|extracts|pageimages',
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

  async function getWikiDataImages(requestURLs) {
    const images = {};
    const responsesMap = requestURLs.map((url) => getResponseJSON(url));
    const responses = await Promise.all(responsesMap);
    const allPages = responses.reduce((accumulator, response) => {
      const { query: { pages = [] } = {} } = response;
      return accumulator.concat(...Object.values(pages));
    }, []);

    // download Images and save to assets
    Object.values(allPages).forEach(async (page) => {
      const { title, fullurl, extract, thumbnail: { source } = {} } = page;

      images[title] = {
        imageURL: source,
        fullurl,
        extract,
        title: formatScientificName(title),
      };
      let count = 0;
      if (source && title && featureFlags?.downloadImages) {
        const imageDownload = await downloadImage(source, title);
        if (await imageDownload) {
          images[title].imageFileName = imageDownload;
        }
      } else if (title) {
        count = count + 1;
        images[title].count = count;
      }
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
  return getWikiDataImages(requestURLs);
}

const trees = [];
const processedTrees = {};

// Ignore the Alameda file, since it doesn't include trees.
const jsonFiles = fs
  .readdirSync(dataPath)
  .filter(
    (filename) =>
      jsonPattern.test(filename) && !ignoreFilePattern.test(filename),
  );

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
    const scientificCase = formatScientificName(scientific);
    const lowerCaseNames = [common, scientific, genus].map(normalizeNames);
    const key = lowerCaseNames.join('');

    // Ignore dupes in the data, as well as things that aren't trees, like fungus and rainbow trout.
    if (
      !processedTrees[key] &&
      !ignoreCommonPattern.test(commonTitleCase) &&
      !ignoreScientificPattern.test(scientific)
    ) {
      trees.push({
        common: replaceIrregularNames(commonTitleCase),
        scientific: replaceIrregularNames(scientificCase),
        genus: replaceIrregularNames(genus),
        // Store the lowercased names on each tree, so that we can sort by those strings.  They
        // don't include non-letter characters, so names like `"Ohi" A Lehua` won't get sorted to
        // the front of the list.
        sort: lowerCaseNames,
      });
      processedTrees[key] = true;
    }
  });
});

function normalizeNames(name) {
  if (!name) {
    return null;
  }

  const normalized = name
    .normalize('NFD')
    .toLowerCase()
    .replace(/[^\w\s]/g, '');

  return normalized || null;
}

function replaceIrregularNames(name) {
  return name === '\b' ? '' : name;
}

// change to lower case, replace hyphens with spaces, if str has multiple spaces, replace with one hyphen
const formatWord = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\s+/g, '-');
};

async function downloadImage(imageURL, title) {
  try {
    const response = await fetch(imageURL);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const dataDir = './client/src/assets/images/data';
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const imageName = `${formatWord(title)}.jpg`;
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(`${dataDir}/${imageName}`, Buffer.from(buffer));

    console.info(`Downloaded and saved image: ${imageName}`);
    return imageName;
  } catch (error) {
    console.error(`Error downloading ${imageURL} - ${error.message}`);
  }
}

// TODO - Fix this to use the iNaturalist API in a stable way, doesn't always work
async function fetchImagesForScientificName(scientificName) {
  const response = await fetch(
    `https://api.inaturalist.org/v1/taxa/autocomplete?q=${encodeURIComponent(
      scientificName,
    )}`,
  );
  const data = await response.json();
  const taxon = data.results[0];

  if (!taxon) {
    console.error(`No taxon found for scientific name: ${scientificName}`);
    return [];
  }

  const taxonId = taxon.id;
  const photosResponse = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_id=${taxonId}&photos=true&per_page=1`,
  );
  const photosData = await photosResponse.json();

  return photosData;
}

async function buildImagesMap(trees) {
  const scientificNames = trees.map((tree) => tree.scientific);
  const uniqueScientificNames = [...new Set(scientificNames)];
  return buildScientificNameToImageMap(uniqueScientificNames);
}

buildImagesMap(trees).then((data) => {
  const formattedData = JSON.stringify(data, null, 2);
  const filename = 'treeImages.json';
  const output = path.resolve(outputPath, filename);
  console.info(`[build:data] Writing ${filename}.`);
  fs.writeFileSync(output, formattedData);
});

writeJSTemplate('trees', trees.sort(createTreeSorter('common')));
