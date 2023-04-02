import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { debounce } from '@mui/material/utils';
import SearchBar from '@/components/Search/SearchBar';
import { mapboxAccessToken } from '@/util/config';

import './Search.scss';

const MIN_CHARS_FOR_SEARCH = 2;
const BASE_MAPBOX_SEARCH_API_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const SEARCH_QUERY_CACHE_TIME = 1000 * 30; // 30 seconds

const Search = ({ map }) => {
  const [query, setQuery] = useState('');
  const [generatedSearchResults, setGeneratedSearchResults] = useState([]);
  const {
    data: mapboxSearchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: query,
    queryFn: () => getMapboxSearchResults(query),
    enabled: query.length > MIN_CHARS_FOR_SEARCH,
    cacheTime: SEARCH_QUERY_CACHE_TIME,
  });

  // Debounce search requests to mitigate churning through our API requests budget
  const debouncedSetQuery = debounce((query) => setQuery(query), 250);
  const handleInputChange = (event) => {
    debugger;
    if (isQueryLatLong) {
      setGeneratedSearchResults([createLatLongSearchResult(query)]);
    } else {
      setGeneratedSearchResults([]);
    }
    debouncedSetQuery(event.currentTarget.value);
  };

  const handleOptionSelect = (e, option) => {
    if (option) {
      map.panTo(option.coords);
    }
  };

  let options = mapboxSearchResults.concat(generatedSearchResults);
  if (!options.length) {
    if (isError) {
      options = [{ label: 'Error encountered. Please try again later.' }];
    } else {
      options = [{ label: 'No results found' }];
    }
  }

  return (
    <div className="search-container">
      <SearchBar
        options={options}
        loading={isLoading}
        handleInputChange={handleInputChange}
        handleOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

const getMapboxSearchResponse = async (query) => {
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

const getMapboxSearchResults = async (query) => {
  const jsonResponse = await getMapboxSearchResponse(query);
  return (
    jsonResponse.features?.map((result) => ({
      label: result.text,
      address: result.place_name,
      id: result.id,
      coords: result.center,
      type: 'Results',
    })) || []
  );
};

// Attempt to parse a latitude and longitude from the query
export const isQueryLatLong = (query) => {
  const tokens = query.split(',');
  if (tokens.length !== 2) {
    return false;
  }

  tokens.forEach((token) => {
    if (!isValidFloat(token)) {
      return false;
    }
  });

  const latitude = parseFloat(tokens[0]);
  // Latitude must be a number between -90 and 90
  if (Math.abs(latitude) > 90) {
    return false;
  }

  const longitude = parseFloat(tokens[1]);
  // Longitude must a number between -180 and 180
  if (Math.abs(longitude) > 180) {
    return false;
  }

  return true;
};

const isValidFloat = (token) => {
  // Check if a token can be parsed into a number, ignoring whitespace
  if (!token.trim() || isNaN(token) || !isFinite(parseFloat(token))) {
    return false;
  }
  return true;
};

// Return a SearchResult that is compatible with the feature data shape from mapbox search API
const createLatLongSearchResult = (query) => {
  const tokens = query.split(',');
  const latLng = tokens.map((token) => parseFloat(token));
  return {
    label: 'Latitude/Longitude Coordinates',
    type: 'Results',
    address: query,
    id: `latlng${latLng[0]}${latLng[1]}`,
    coords: latLng,
  };
};

export default Search;
