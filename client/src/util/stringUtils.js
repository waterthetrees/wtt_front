/**
 * This is a generic utility function that can be used for any string.
 *
 * @param {string} str - any string
 * @returns {string} - The formatted string
 *
 * @example
 * // returns 'Red Oak'
 * toTitleCase('red oak')
 */
export function toTitleCase(str) {
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

/**
 * Formats cultivar name.
 * Cultivar should be capitalized and in single quotes.
 * Cultivar should be title case and in single quotes.
 *
 * @param {string} cultivar - The cultivar of the tree
 * @returns {string} - The formatted cultivar name
 *
 * @example
 * // returns ' Nidiformis'
 * formatCultivar("Nidiformis")
 */
export function formatCultivar(cultivar) {
  if (!cultivar) return '';
  const cultivarWithoutQuotes = cultivar.replace(/["']/g, '');
  const titleCasedCultivar = toTitleCase(cultivarWithoutQuotes);
  return ` '${titleCasedCultivar}'`;
}

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
export function formatScientificName(scientificName) {
  if (!scientificName) return '';

  const strSplitter = '--------cultivarSplitter--------';

  const [genusSpeciesEpithet, cultivar] = scientificName
    .trim()
    .replace(/["]/g, "'") // replace double quotes with single quotes
    .replace(/[']/, `${strSplitter}'`) // Add in strSplitter to use for splitting quoted cultivar out of name
    .split(strSplitter);

  const formattedCultivar = cultivar ? formatCultivar(cultivar) : '';
  const [genus, species, ...epithet] = genusSpeciesEpithet.trim().split(' ');

  const formattedGenus = genus
    ? genus.charAt(0).toUpperCase() + genus.slice(1).toLowerCase()
    : '';

  const formattedSpecies = species ? ` ${species.toLowerCase()}` : '';

  const formattedEpithet = epithet?.length
    ? ` ${epithet.join(' ').toLowerCase()}`
    : '';

  return `${formattedGenus}${formattedSpecies}${formattedEpithet}${formattedCultivar}`;
}
