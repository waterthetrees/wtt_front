import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

function createUseQuery(api, defaultData = {}, defaultOptions = {}, processor) {
  const getter = typeof processor === 'function'
    ? (...args) => getData(...args).then(processor)
    : getData;

  return function (queryData = {}, queryOptions = {}) {
    const data = { ...defaultData, ...queryData };
    const options = { ...defaultOptions, ...queryOptions };

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

  return function () {
    const queryClient = useQueryClient();

    return useMutation((data) => apiCaller(apis[0], data), {
      onSuccess: () => apis.forEach((api) => queryClient.invalidateQueries(api)),
      onError: (error) => console.error(`useMutation: ${method} ${apis} ${error}`),
    });
  };
}

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

// Create custom useQuery() hooks for the API.
export const useUserAdoptedQuery = createUseQuery('usercounts', { request: 'adopted' });
export const useUserLikedQuery = createUseQuery('usercounts', { request: 'liked' });
export const useUserPlantedQuery = createUseQuery('usercounts', { request: 'planted' });
export const useUserTreeHistoryQuery = createUseQuery('usertreehistory');
export const useCitiesQuery = createUseQuery('cities', null, null, processTreeCounts);
export const useCountriesQuery = createUseQuery('countries', { country: 'All' }, null, processTreeCounts);
export const useTreemapQuery = createUseQuery('treemap', { city: '%' });
export const useTreeQuery = createUseQuery('trees');
export const useTreeHistoryQuery = createUseQuery('treehistory');
export const useTreeLikesQuery = createUseQuery('treelikes', null, {
  placeholderData: {
    liked: false,
    likedCount: 0,
  },
});
export const useTreeAdoptionsQuery = createUseQuery('treeadoptions', null, {
  placeholderData: {
    adopted: false,
    adoptedCount: 0,
  },
});

// Create custom useMutation() hooks for the API.
export const useUserMutation = createUseMutation('users');
export const useTreeDataMutation = createUseMutation(['trees', 'treemap'], 'PUT');
export const useCreateTreeDataMutation = createUseMutation(['trees', 'treemap']);
export const useTreeHistoryMutation = createUseMutation('treehistory');
export const useTreeLikesMutation = createUseMutation(['treelikes', 'treehistory']);
export const useTreeAdoptionsMutation = createUseMutation(['treeadoptions', 'treehistory']);
