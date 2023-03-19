import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SearchBar from '@/components/Search/SearchBar';
import { mapboxAccessToken } from '@/util/config';

import './Search.scss';

const MIN_CHARS_FOR_SEARCH = 2;
const BASE_MAPBOX_SEARCH_API_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/';

// Remove after searchbar autocomplete is hooked up to mapbox geocoding API
// and event listeners are hooked up to mapbox actions
const mockResponse = {
  type: 'FeatureCollection',
  query: ['825', 's', 'milwaukee', 'ave', 'deerfield', 'il', '60015'],
  features: [
    {
      id: 'address.4356035406756260',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {},
      text: 'Milwaukee Ave',
      place_name: '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
      matching_text: 'South Milwaukee Avenue',
      matching_place_name:
        '825 South Milwaukee Avenue, Deerfield, Illinois 60015, United States',
      center: [-87.921434, 42.166602],
      geometry: {
        type: 'Point',
        coordinates: [-87.921434, 42.166602],
        interpolated: true,
        omitted: true,
      },
      address: '825',
      context: [
        {
          id: 'neighborhood.287187',
          text: 'Lake Cook Road',
        },
        {
          id: 'postcode.13903677306297990',
          text: '60015',
        },
        {
          id: 'place.5958304312090910',
          wikidata: 'Q287895',
          text: 'Deerfield',
        },
        {
          id: 'region.3290978600358810',
          short_code: 'US-IL',
          wikidata: 'Q1204',
          text: 'Illinois',
        },
        {
          id: 'country.9053006287256050',
          short_code: 'us',
          wikidata: 'Q30',
          text: 'United States',
        },
      ],
    },
    {
      id: 'address.7464624790403620',
      type: 'Feature',
      place_type: ['address'],
      relevance: 0.5,
      properties: {},
      text: 'Milwaukee Ave',
      place_name: '825 Milwaukee Ave, Wheeling, Illinois 60090, United States',
      matching_text: 'South Milwaukee Avenue',
      matching_place_name:
        '825 South Milwaukee Avenue, Wheeling, Illinois 60090, United States',
      center: [-87.910299, 42.144504],
      geometry: {
        type: 'Point',
        coordinates: [-87.910299, 42.144504],
        interpolated: true,
      },
      address: '825',
      context: [
        {
          id: 'neighborhood.287187',
          text: 'Lake Cook Road',
        },
        {
          id: 'postcode.9418633295906190',
          text: '60090',
        },
        {
          id: 'place.9902190947082220',
          wikidata: 'Q935043',
          text: 'Wheeling',
        },
        {
          id: 'region.3290978600358810',
          short_code: 'US-IL',
          wikidata: 'Q1204',
          text: 'Illinois',
        },
        {
          id: 'country.9053006287256050',
          short_code: 'us',
          wikidata: 'Q30',
          text: 'United States',
        },
      ],
    },
  ],
  attribution:
    'NOTICE: © 2018 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.',
};

const Search = () => {
  const [query, setQuery] = useState('');
  const { data: searchResults } = useQuery({
    queryKey: query,
    queryFn: () => getSearchResults(query),
    enabled: query.length > MIN_CHARS_FOR_SEARCH,
  });
  const handleChange = (event) => {
    setQuery(event.currentTarget.value);
  };

  const options =
    searchResults?.features.map((result) => ({
      label: result.text,
      address: result.place_name,
      id: result.id,
      coords: result.center,
      type: 'Results',
    })) || [];

  return (
    <div className="search-container">
      <SearchBar options={options} loading={false} onChange={handleChange} />
    </div>
  );
};

const getSearchResults = async (query) => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const coords = hashParams.get('pos')?.split('/');
  const searchParams = new URLSearchParams({
    access_token: mapboxAccessToken,
    autocomplete: true,
    fuzzymatch: true,
    proximity: `${coords[2]},${coords[1]}`,
  });
  const url = `${BASE_MAPBOX_SEARCH_API_URL}${query}.json?${searchParams}`;

  const response = await fetch(url);

  if (response && !response.ok) {
    // Throw an error so react-query knows to retry the request.
    throw new Error(`${response.status} (${response.statusText}) ${url}`);
  }

  return response && response.json();
};

export default Search;
