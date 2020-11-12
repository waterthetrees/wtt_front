// queries.js
import axios from 'axios';
import apiEndpoints from './apiEndpoints.js';

async function getData(...args) {
  const functionName = 'getData';
  const [request, params] = args;

  console.log(functionName, 'request', request, 'params', params, ' \n\n\n\n');
  const serializedData = serializeData(params);
  const url = `${apiEndpoints[request]}?${serializedData}`;
  // console.log(functionName, 'url', url, '\n\n\n\n');

  const options = {
    // url,
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    params,
  };
  // console.log(functionName, 'options', options, '\n\n\n\n');
  const response = await fetch(url, options);

  // console.log(functionName, 'response', await response.json(), 'abomb\n\n\n\n');
  return await response.json(); // parses JSON response into native JavaScript objects
}

const serializeData = (data) =>
  // console.log(data,'serializeData');
  Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

async function postData(...args) {
  const functionName = 'postData';
  const [request] = args;
  const data = request[1];
  console.log(functionName, 'request', request, 'request[0]', request[0], 'data', data, '\n\n\n\n');
  // Default options are marked with *
  const url = apiEndpoints[request[0]];
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
    data, // body data type must match "Content-Type" header
  };
  // console.log(functionName, 'options', options, '\n\n\n\n');
  const response = await fetch(url, options);
  // console.log(functionName, 'response', await response.json(), '\n\n\n\n');
  return await response.json(); // parses JSON response into native JavaScript objects
}

async function putData(...args) {
  const functionName = 'postData';
  const [request] = args;
  const data = request[1];
  console.log(functionName, 'request', request[0], 'data', data, '\n\n\n\n');
  // Default options are marked with *
  const url = apiEndpoints[request[0]];
  const options = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
    data, // body data type must match "Content-Type" header
  };
  // console.log(functionName, 'options', options, '\n\n\n\n');
  const response = await fetch(url, options);
  // console.log(functionName, 'response', await response.json(), '\n\n\n\n');
  return await response.json(); // parses JSON response into native JavaScript objects
}

export { postData, putData, getData };
