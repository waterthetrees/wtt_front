import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SearchBar from '@/components/Search/SearchBar';
import { mapboxAccessToken } from '@/util/config';

import './Search.scss';

const MIN_CHARS_FOR_SEARCH = 2;
const BASE_MAPBOX_SEARCH_API_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const Search = () => {
  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading } = useQuery({
    queryKey: query,
    queryFn: () => getSearchResults(query),
    enabled: query.length > MIN_CHARS_FOR_SEARCH,
  });
  const handleChange = (event) => {
    setQuery(event.currentTarget.value);
  };

  const options = searchResults?.features.map((result) => ({
    label: result.text,
    address: result.place_name,
    id: result.id,
    coords: result.center,
    type: 'Results',
  }));

  return (
    <div className="search-container">
      <SearchBar
        options={options}
        loading={isLoading}
        onChange={handleChange}
      />
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
