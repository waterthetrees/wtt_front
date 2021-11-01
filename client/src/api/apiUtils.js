import apiEndpoints from "./apiEndpoints";

const defaultOptions = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
};
const defaultPostOptions = {
  cache: 'no-cache',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
};

function createAPIFetch(method) {
  return async function(query, data) {
    const options = { ...defaultOptions, method };
    let url;

    if (method === 'GET') {
      const { queryKey: [api, params] } = query;

      url = apiEndpoints[api];

      if (params) {
        url += `?${new URLSearchParams(params)}`;
      }
    } else {
      url = apiEndpoints[query];
      Object.assign(options, defaultPostOptions);

      if (data) {
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, options);

    return response && response.json();
  };
}

export const getData = createAPIFetch('GET');
export const postData = createAPIFetch('POST');
export const putData = createAPIFetch('PUT');
