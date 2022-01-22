import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

function createUseQuery(api, options = {}) {
  const { defaultData = {}, defaultOptions = {}, preProcessor, postProcessor } = options;
  const getter = typeof postProcessor === 'function'
    ? (...args) => getData(...args).then(postProcessor)
    : getData;

  return function(queryData = {}, queryOptions = {}) {
    const data = { ...defaultData, ...queryData };
    const options = { ...defaultOptions, ...queryOptions };

    if (typeof preProcessor === 'function') {
      return preProcessor(api, data, getter, options);
    }

    return useQuery([api, data], getter, options);
  };
}

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

function processTreeCounts(treeCounts) {
  return treeCounts.map(({ city, country, count, countryCountTrees, lat, lng }) => {
    const name = city || country;
    const countString = Number(count || countryCountTrees).toLocaleString();

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      properties: {
        name: name,
        cityCountTrees: `${countString} trees`,
        count: `${countString} trees`,
      },
    };
  });
}

// Create custom useQuery() hooks for the API.
export const useUserAdoptedQuery = createUseQuery('usercounts', { defaultData: { request: 'adopted' }});
export const useUserLikedQuery = createUseQuery('usercounts', { defaultData: { request: 'liked' } });
export const useUserPlantedQuery = createUseQuery('usercounts', { defaultData: { request: 'planted' } });
export const useUserTreeHistoryQuery = createUseQuery('usertreehistory');
export const useCitiesQuery = createUseQuery('cities', { postProcessor: processTreeCounts });
export const useCountriesQuery = createUseQuery('countries', {
  defaultData: {
    country: 'All'
  },
  postProcessor: processTreeCounts
});
export const useTreemapQuery = createUseQuery('treemap', { defaultData: { city: '%' } });
export const useTreeQuery = createUseQuery('trees', {
  preProcessor(api, data, getter, options) {
    // If id is null, we don't want to call the server with that, as it'll return an error,
    // cluttering the console.  So instead of the normal getter, wrap a null response in a
    // promise to avoid the error.  We can't just conditionally call useQuery(), since that
    // triggers a React exception.
    return useQuery(
      [api, data],
      !data.id
        ? () => Promise.resolve(null)
        : getter,
      options
    );
  }
});
export const useTreeHistoryQuery = createUseQuery('treehistory');
export const useTreeLikesQuery = createUseQuery('treelikes', {
  defaultOptions: {
    placeholderData: {
      liked: false,
      likedCount: 0,
    },
  }
});
export const useTreeAdoptionsQuery = createUseQuery('treeadoptions', {
  defaultOptions: {
    placeholderData: {
      adopted: false,
      adoptedCount: 0,
    },
  }
});

// Create custom useMutation() hooks for the API.
export const useUserMutation = createUseMutation('users');
export const useTreeDataMutation = createUseMutation(['trees', 'treemap'], 'PUT');
export const useCreateTreeDataMutation = createUseMutation(['trees', 'treemap']);
export const useTreeHistoryMutation = createUseMutation('treehistory');
export const useTreeLikesMutation = createUseMutation(['treelikes', 'treehistory']);
export const useTreeAdoptionsMutation = createUseMutation(['treeadoptions', 'treehistory']);
