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
  return async function (query, data) {
    const options = { ...defaultOptions, method };
    let url;

    if (method === 'GET') {
      const {
        queryKey: [api, params],
      } = query;
      // Cast all non-objects to {} so that the paramString will be empty.
      const paramString = String(new URLSearchParams(Object(params)));

      url = apiEndpoints[api];

      if (paramString) {
        url += `?${paramString}`;
      }
    } else {
      const [api, body] = Array.isArray(query) ? query : [query, data];

      url = apiEndpoints[api];
      Object.assign(options, defaultPostOptions);

      if (body) {
        options.body = JSON.stringify(body);
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
