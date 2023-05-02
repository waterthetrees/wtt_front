// Common Names should be title case. All major words are capitalized, while minor words are lowercased
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

// Cultivar should be title case and in single quotes.
export function formatCultivar(cultivar) {
  if (!cultivar) return '';
  const cultivarWithoutQuotes = cultivar.replace(/["']/g, '');
  const titleCasedCultivar = toTitleCase(cultivarWithoutQuotes);
  return ` '${titleCasedCultivar}'`;
}

// Scientific naming:
// Genus name is always capitalized,
// Species name and any infraspecific epithets are written in lowercase.
// Cultivar should be capitalized and in single quotes.
// All should be typically italicized.
export function formatScientificName(scientificName) {
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
