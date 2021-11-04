import apiEndpoints from './apiEndpoints';

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
      // Cast all non-objects to {} so that the paramString will be empty.
      const paramString = String(new URLSearchParams(Object(params)));

      url = apiEndpoints[api];

      if (paramString) {
        url += `?${paramString}`;
      }
    } else {
      url = apiEndpoints[query];
      Object.assign(options, defaultPostOptions);

      if (data) {
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, options);

    if (response && !response.ok) {
      // Throw an error so react-query knows to retry the request.
      throw new Error(`${response.status} (${response.statusText}) ${url}`);
    }

    return response && response.json();
  };
}

export const getData = createAPIFetch('GET');
export const postData = createAPIFetch('POST');
export const putData = createAPIFetch('PUT');
