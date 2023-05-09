export const saveTimer = 800;

export const maintenanceActions = [
  ['water', 'watered'],
  ['weed', 'weeded'],
  ['mulch', 'mulched'],
  ['stake', 'staked'],
  ['brace', 'braced'],
  ['prune', 'pruned'],
];

export const REGION_TYPES = {
  COUNTRY: 'country',
  // Top-level sub-national administrative features,
  // such as states in the United States or provinces in Canada or China.
  REGION: 'region',
  POSTAL_CODE: 'postcode',
  // Features that are smaller than top-level administrative features but
  // typically larger than cities,  (for example, prefectures in China)
  DISTRICT: 'district',
  // 	Typically these are cities, villages, municipalities, etc.
  PLACE: 'place',
  // Colloquial sub-city features often referred to in local parlance. Unlike
  // locality features, these typically lack official status and may lack
  // universally agreed-upon boundaries.
  NEIGHBORHOOD: 'neighborhood',
  // Official sub-city features present in countries where such an
  // additional administrative layer is used in postal addressing, or
  // where such features are commonly referred to in local parlance.
  // Examples include city districts in Brazil and Chile and arrondissements
  // in France.
  LOCALITY: 'locality',
  ADDRESS: 'address',
  // Points of interest. These include restaurants, stores, concert venues,
  // parks, museums, etc.
  POI: 'poi',
  LATLONG: 'latlong',
};
