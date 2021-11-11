import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

function createUseQuery(api, defaultData = {}, defaultOptions = {}) {
  return function(queryData = {}, queryOptions = {}) {
    const data = { ...defaultData, ...queryData };
    const options = { ...defaultOptions, ...queryOptions };

    return useQuery([api, data], getData, options);
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

// Create custom useQuery() hooks for the API.
export const useUserAdoptedQuery = createUseQuery('usercounts', { request: 'adopted' });
export const useUserLikedQuery = createUseQuery('usercounts', { request: 'liked' });
export const useUserPlantedQuery = createUseQuery('usercounts', { request: 'planted' });
export const useUserTreeHistoryQuery = createUseQuery('usertreehistory');
export const useCitiesQuery = createUseQuery('cities');
export const useCountriesQuery = createUseQuery('countries', { country: 'All' });
export const useTreemapQuery = createUseQuery('treemap');
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
