import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

/**
 * Create a custom `useQuery` hook to call a given WTT server API method.
 *
 * @param {string} api - The key that the fetching function uses to look up an API's URL in the
 * `apiEndpoints` constant.
 * @param {object} [options] - An optional config object.
 * @param {object} [options.defaultData] - An optional object that supplies defaults for the API
 * call.  Any data supplied to the hook will be merged on top of these defaults.
 * @param {object} [options.defaultOptions] - An optional config object that is passed to the
 * `useQuery` function with each call to the hook.
 * @param {function(string, object, function, object)} [options.preProcessor] - An optional function
 * that can modify the custom hook's parameters before they're passed to `useQuery`.
 * @param {function(*)} [options.postProcessor] - An optional function that can modify the results
 * of the API call before they're returned by the hook.
 * @returns {function([object], [object])} - A function that wraps a call to `useQuery`.  The
 * optional first parameter can supply additional data to the query, and the second parameter can
 * pass options.  See the [`useQuery`](https://react-query.tanstack.com/reference/useQuery)
 * documentation for details.
 */
function createUseQuery(api, options = {}) {
  const {
    defaultData = {},
    defaultOptions = {},
    preProcessor,
    postProcessor,
  } = options;
  const queryFn =
    typeof postProcessor === 'function'
      ? (...args) => getData(...args).then(postProcessor)
      : getData;

  return function (queryData = {}, queryOptions = {}) {
    const data = { ...defaultData, ...queryData };
    const options = { ...defaultOptions, ...queryOptions };

    if (typeof preProcessor === 'function') {
      return preProcessor(api, data, queryFn, options);
    }

    return useQuery([api, data], queryFn, options);
  };
}

/**
 * Create a custom `useMutation` hook to send data to a WTT API method.  By default, the hook will
 * invalidate any queries that are pending for the API on success, and log any errors.
 *
 * @param {string|[string]} apiList - One or more APIs whose in-flight queries should be invalidated
 * by this mutation.  The first API listed is the one that will be called by the hook.
 * @param {string} [method] - The HTTP method to use for the call.  Defaults to `'POST'`.
 * @returns {function} - See the [`useMutation`](https://react-query.tanstack.com/reference/useMutation)
 * documentation for details.
 */
function createUseMutation(apiList, method) {
  const apis = Array.isArray(apiList) ? apiList : [apiList];
  const apiCaller = method === 'PUT' ? putData : postData;

  return function () {
    const queryClient = useQueryClient();

    return useMutation((data) => apiCaller(apis[0], data), {
      onSuccess: () =>
        apis.forEach((api) => queryClient.invalidateQueries(api)),
      onError: (error) =>
        console.error(`useMutation: ${method} ${apis} ${error}`),
    });
  };
}

// Custom postProcessor to convert the response from calls to `/cities` and `/countries` into arrays
// of GeoJSON features.
function processTreeCounts(treeCounts) {
  return treeCounts.map(
    ({ city, country, count, countryCountTrees, lat, lng }) => {
      const name = city || country;
      const countString = Number(count || countryCountTrees).toLocaleString();

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        properties: {
          name,
          cityCountTrees: `${countString} trees`,
          count: `${countString} trees`,
        },
      };
    },
  );
}

// Create custom `useQuery` hooks for GET calls to the WTT API.  These wrap the API method names and
// default parameters so they don't have to be repeated with each use of a hook.
export const useUserAdoptedQuery = createUseQuery('usercounts', {
  defaultData: { request: 'adopted' },
});
export const useUserLikedQuery = createUseQuery('usercounts', {
  defaultData: { request: 'liked' },
});
export const useUserPlantedQuery = createUseQuery('usercounts', {
  defaultData: { request: 'planted' },
});
export const useUserTreeHistoryQuery = createUseQuery('usertreehistory');
export const useCitiesQuery = createUseQuery('cities', {
  postProcessor: processTreeCounts,
});
export const useSourcesQuery = createUseQuery('sources', {
  defaultData: { source: 'All' },
});
export const useCountriesQuery = createUseQuery('countries', {
  defaultData: { country: 'All' },
  postProcessor: processTreeCounts,
});
export const useTreemapQuery = createUseQuery('treemap', {
  defaultData: { city: '%' },
});

export const useTreeQuery = createUseQuery('trees', {
  preProcessor(api, data, queryFn, options) {
    // If id is null, we don't want to call the server with that, as it'll return an error,
    // cluttering the console.  To avoid the error, use a promise that resolves to null instead of
    // the normal queryFn.  We can't just conditionally call useQuery() when the is null, since
    // that triggers a React exception.
    return useQuery(
      [api, data],
      !data.id ? () => Promise.resolve(null) : queryFn,
      options,
    );
  },
});

export const useTreeHistoryQuery = createUseQuery('treehistory');
export const useTreeLikesQuery = createUseQuery('treelikes', {
  defaultOptions: {
    placeholderData: {
      liked: false,
      likedCount: 0,
    },
  },
});
export const useTreeAdoptionsQuery = createUseQuery('treeadoptions', {
  defaultOptions: {
    placeholderData: {
      adopted: false,
      adoptedCount: 0,
    },
  },
});

// Create custom `useMutation` hooks for the POST/PUT calls to the WTT API.  These will
// automatically invalidate related in-flight queries, so that they'll be retried after the mutation
// to get the latest data.
export const useUserMutation = createUseMutation('users');
export const useTreeDataMutation = createUseMutation(
  ['trees', 'treemap'],
  'PUT',
);
export const useCreateTreeDataMutation = createUseMutation([
  'trees',
  'treemap',
]);
export const useTreeHistoryMutation = createUseMutation('treehistory');
export const useTreeLikesMutation = createUseMutation([
  'treelikes',
  'treehistory',
]);
export const useTreeAdoptionsMutation = createUseMutation([
  'treeadoptions',
  'treehistory',
]);

export const useCountriesMutation = createUseMutation(['countries']);
export const useCitiesMutation = createUseMutation(['cities', 'city']);
export const useSourcesMutation = createUseMutation(['sources']);
