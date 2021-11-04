import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, postData, putData } from './apiUtils';

function createUseQuery(api, defaultData = {}) {
  return function(queryData = {}, options) {
    const data = { ...defaultData, ...queryData };

    return useQuery([api, data], getData, options);
  };
}

function createUseMutation(...apis) {
  return function() {
    const queryClient = useQueryClient();

    return useMutation(([data]) => postData(apis[0], data), {
      onSuccess: () => apis.forEach(api => queryClient.invalidateQueries(api)),
      onError: console.error,
    });
  };
}

export const useCitiesQuery = createUseQuery('cities');
export const useCountriesQuery = createUseQuery('countries', { country: 'All' });

//const useLikesMutation = createUseMutation('treelikes', 'treehistory');
//const useAdoptionMutation = createUseMutation('treeadoptions', 'treehistory');

// TODO: remove this export when everything is using a custom hook
export { getData, postData, putData };
