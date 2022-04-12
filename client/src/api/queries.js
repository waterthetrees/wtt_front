import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    defaultData = {}, defaultOptions = {}, preProcessor, postProcessor,
  } = options;
  const queryFn = typeof postProcessor === 'function'
    ? (...args) => getData(...args).then(postProcessor)
    : getData;

  return function(queryData = {}, queryOptions = {}) {
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
  const apis = Array.isArray(apiList)
    ? apiList
    : [apiList];
  const apiCaller = method === 'PUT'
    ? putData
    : postData;

  return function() {
    const queryClient = useQueryClient();

    return useMutation((data) => apiCaller(apis[0], data), {
      onSuccess: () => apis.forEach((api) => queryClient.invalidateQueries(api)),
      onError: (error) => console.error(`useMutation: ${method} ${apis} ${error}`),
    });
  };
}

// Custom postProcessor to convert the response from calls to `/cities` and `/countries` into arrays
// of GeoJSON features.
function processTreeCounts(treeCounts) {
  return treeCounts.map(({
    city, country, count, countryCountTrees, lat, lng,
  }) => {
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
  });
}

// Create custom `useQuery` hooks for GET calls to the WTT API.  These wrap the API method names and
// default parameters so they don't have to be repeated with each use of a hook.
export const useUserAdoptedQuery = createUseQuery('usercounts', { defaultData: { request: 'adopted' } });
export const useUserLikedQuery = createUseQuery('usercounts', { defaultData: { request: 'liked' } });
export const useUserPlantedQuery = createUseQuery('usercounts', { defaultData: { request: 'planted' } });
export const useUserTreeHistoryQuery = createUseQuery('usertreehistory');
export const useCitiesQuery = createUseQuery('cities', { postProcessor: processTreeCounts });
export const useCountriesQuery = createUseQuery('countries', {
  defaultData: {
    country: 'All',
  },
  postProcessor: processTreeCounts,
});
export const useTreemapQuery = createUseQuery('treemap', { defaultData: { city: '%' } });

export const useTreeQuery = createUseQuery('trees', {
  preProcessor(api, data, queryFn, options) {
    // If id is null, we don't want to call the server with that, as it'll return an error,
    // cluttering the console.  To avoid the error, use a promise that resolves to null instead of
    // the normal queryFn.  We can't just conditionally call useQuery() when the is null, since
    // that triggers a React exception.
    return useQuery(
      [api, data],
      !data.id
        ? () => Promise.resolve(null)
        : queryFn,
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
export const useTreeDataMutation = createUseMutation(['trees', 'treemap'], 'PUT');
export const useCreateTreeDataMutation = createUseMutation(['trees', 'treemap']);
export const useTreeHistoryMutation = createUseMutation('treehistory');
export const useTreeLikesMutation = createUseMutation(['treelikes', 'treehistory']);
export const useTreeAdoptionsMutation = createUseMutation(['treeadoptions', 'treehistory']);

export function useCreateOrUpdateTree() {
  const [changedData, setChangedData] = useState(null);
  // Once the tree ID has been set, try to get its data from the backend.
  const query = useTreeQuery({ id: changedData?.id }, {
    // We don't want to fire this query until mutate() has been called with some data to change.
    enabled: !!changedData,
    // This query is likely to 404, and we don't want to retry in that case.
    retry: 0
  });
  // We need separate mutations for create vs. just update, since one uses POST and the other PUT.
  // We'll trigger only one of them in the useEffect below.
  const createTreeData = useCreateTreeDataMutation();
  const mutateTreeData = useTreeDataMutation();
  // Use a ref to store the resolve function from the promise that will be returned by
  // createOrUpdate(), so that we can resolve it later in the useEffect below once the tree has
  // been created or updated.
  const resolvePromise = useRef();
  // Store a callback so we can return a function that won't change on every render.
  const createOrUpdate = useCallback((changedData) => {
      setChangedData(changedData);

      // Return a promise so that the caller can wait for the create or update mutations to run
      // before performing any additional updates that need to happen.
      return new Promise((resolve) => resolvePromise.current = resolve);
    },
    [setChangedData]
  );

  useEffect(() => {
    // Don't do anything until data to change has been received and the /trees query is done.
    if (changedData && !query.isFetching) {
      // Separate the id from any other data fields that were passed in.
      const { id, ...data } = changedData;
      const { current: resolve } = resolvePromise;
      let result;

      if (query.isError) {
        // Querying for the tree by ID returned an error, which means we need to create it in the
        // DB.  We'll use the data that was pre-cached from the vector tile, which is still cached
        // by react-query in query.data, plus any changed data.
        result = createTreeData.mutateAsync({ ...query.data, ...changedData });
      } else if (Object.keys(data).length) {
        // The tree already exists and fields other than just id were passed in, so we don't need to
        // create a new tree, just mutate the existing one with the changed data.
        result = mutateTreeData.mutateAsync(changedData);
      }

      // Resolve the promise that we returned from createOrUpdate() with the promise that was just
      // returned from the react-query mutations above.  Or we'll resolve it with undefined if only
      // an id was passed in and the tree already exists.
      resolve(result);

      // Now that we've used this data to mutate the tree, clear it.
      setChangedData(null);
    }
  }, [changedData, query.isFetching]);

  return createOrUpdate;
}
