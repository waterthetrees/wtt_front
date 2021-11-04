import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

function createUseQuery(api, defaultData = {}) {
  return function(queryData = {}, options) {
    const data = { ...defaultData, ...queryData };

    return useQuery([api, data], getData, options);
  };
}

function createUseMutation(apiList, method = 'POST') {
  const apis = Array.isArray(apiList)
    ? apiList
    : [apiList];
  const apiCaller = method === 'POST'
    ? postData
    : putData;

  return function() {
    const queryClient = useQueryClient();

    return useMutation(data => apiCaller(apis[0], data), {
      onSuccess: () => apis.forEach(api => queryClient.invalidateQueries(api)),
      onError: error => console.error(`useMutation: ${method} ${apis} ${error}`),
    });
  };
}

export const useCitiesQuery = createUseQuery('cities');
export const useCountriesQuery = createUseQuery('countries', { country: 'All' });
export const useTreeQuery = createUseQuery('trees');
export const useTreeHistoryQuery = createUseQuery('treehistory');

export const useTreeDataMutation = createUseMutation(['trees', 'treemap'], 'PUT');
export const useTreeHistoryMutation = createUseMutation('treehistory');
//const useTreeLikesMutation = createUseMutation(['treelikes', 'treehistory']);
//const useTreeAdoptionsMutation = createUseMutation(['treeadoptions', 'treehistory']);

// TODO: remove this export when everything is using a custom hook
export { getData, postData, putData };
