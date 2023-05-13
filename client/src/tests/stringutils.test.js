import {
  formatCultivar,
  formatScientificName,
  toTitleCase,
} from '@/util/stringUtils';

// SO MANY TESTS because these are critical functions that can be used in many places

describe('formatScientificName', () => {
  test('should return an empty string if no input is provided', () => {
    expect(formatScientificName()).toEqual('');
  });

  test('formats a simple genus and species', () => {
    const input = 'sequoia sempervirens';
    const expectedResult = 'Sequoia sempervirens';
    expect(formatScientificName(input)).toBe(expectedResult);
  });

  test('formats a name with lowercase epithets', () => {
    const input = 'betula pendula var. carelica';
    const expectedResult = 'Betula pendula var. carelica';
    expect(formatScientificName(input)).toBe(expectedResult);
  });

  test('formats a name with cultivar in single quotes', () => {
    const input = "acer platanoides 'Crimson King'";
    const expectedResult = "Acer platanoides 'Crimson King'";
    expect(formatScientificName(input)).toBe(expectedResult);
  });

  test('formats a name with cultivar in double quotes', () => {
    const input = 'acer platanoides "Crimson King"';
    const expectedResult = "Acer platanoides 'Crimson King'";
    expect(formatScientificName(input)).toBe(expectedResult);
  });

  test('formats a name with mixed case input', () => {
    const input = 'sEquOia SemperVirens';
    const expectedResult = 'Sequoia sempervirens';
    expect(formatScientificName(input)).toBe(expectedResult);
  });

  test('should properly format genus with mixed case input', () => {
    const input = 'qUeRcUs robur';
    const expectedOutput = 'Quercus robur';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should properly format species with mixed case input', () => {
    const input = 'Quercus RoBuR';
    const expectedOutput = 'Quercus robur';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should handle genus with only one character', () => {
    const input = 'Q robur';
    const expectedOutput = 'Q robur';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should handle species with only one character', () => {
    const input = 'Quercus r';
    const expectedOutput = 'Quercus r';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should return an empty string if input contains only spaces', () => {
    const input = '   ';
    const expectedOutput = '';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should return genus only if no species is provided', () => {
    const input = 'Quercus';
    const expectedOutput = 'Quercus';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should properly format a scientific name without cultivar', () => {
    const input = 'Quercus robur L.';
    const expectedOutput = 'Quercus robur l.';
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should properly format a scientific name with cultivar', () => {
    const input = 'Quercus robur "Fastigiata"';
    const expectedOutput = "Quercus robur 'Fastigiata'";
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should handle mixed case input', () => {
    const input = 'qUeRcUs RoBuR "FaStIgIaTa"';
    const expectedOutput = "Quercus robur 'Fastigiata'";
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should handle leading and trailing spaces', () => {
    const input = '  Quercus robur "Fastigiata"  ';
    const expectedOutput = "Quercus robur 'Fastigiata'";
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  test('should properly format a scientific name with additional epithets', () => {
    const input = 'Rosa x hybrida L. "Grandiflora"';
    const expectedOutput = "Rosa x hybrida l. 'Grandiflora'";
    expect(formatScientificName(input)).toEqual(expectedOutput);
  });

  // test('formats a name with mixed case input', () => {
  //   // TODO fix this test
  //   // FML: [Merklin] Hämet-Aht?
  //   const input = 'Betula pendula Roth. var. carelica [Merklin] Hämet-Aht';
  //   const expectedResult =
  //     'Betula pendula Roth. var. carelica [Merklin] Hämet-Aht';
  //   expect(formatScientificName(input)).toBe(expectedResult);
  // });
});

describe('formatCultivar', () => {
  test('returns an empty string if the input is empty', () => {
    const input = '';
    const expectedResult = '';
    expect(formatCultivar(input)).toBe(expectedResult);
  });

  test('formats a simple genus and species', () => {
    const input = 'crimson king';
    const expectedResult = " 'Crimson King'";
    expect(formatCultivar(input)).toBe(expectedResult);
  });

  test('formats a name with lowercase epithets', () => {
    const input = '"crimson king"';
    const expectedResult = " 'Crimson King'";
    expect(formatCultivar(input)).toBe(expectedResult);
  });

  test('formats a name with cultivar in single quotes', () => {
    const input = "'crimson king'";
    const expectedResult = " 'Crimson King'";
    expect(formatCultivar(input)).toBe(expectedResult);
  });
});

describe('toTitleCase', () => {
  test('returns an empty string if the input is empty', () => {
    const input = '';
    const expectedResult = '';
    expect(toTitleCase(input)).toBe(expectedResult);
  });

  test('returns a string with the first letter capitalized if the input is a single word', () => {
    const input = 'oak';
    const expectedResult = 'Oak';
    expect(toTitleCase(input)).toBe(expectedResult);
  });

  test('capitalizes the first letter of each word except for excluded words', () => {
    const input = 'gala apple tree';
    const expectedResult = 'Gala Apple Tree';
    expect(toTitleCase(input)).toBe(expectedResult);
  });

  test('capitalizes the first letter of excluded words if they are at the beginning of the string', () => {
    const input = 'of Oak and Ash';
    const expectedResult = 'Of Oak and Ash';
    expect(toTitleCase(input)).toBe(expectedResult);
  });

  test('handles mixed case input', () => {
    const input = 'PineApple Guava';
    const expectedResult = 'Pineapple Guava';
    expect(toTitleCase(input)).toBe(expectedResult);
  });

  test('handles input with extra spaces', () => {
    const input = '  dr. hurd  ';
    const expectedResult = 'Dr. Hurd';
    expect(toTitleCase(input)).toBe(expectedResult);
  });
});
