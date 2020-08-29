export const FUNCTION_ACTION = 'ACTION';

export const serializeData = (data) => {
  // console.log(data,'serializeData');
  return Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
}

const setHeaders = (function_caller_name) => {
  switch(function_caller_name){
    case 'getTreeListMap': return { 'Content-Type': 'application/json','Accept': 'application/json'};
    case 'getTree': return { 'Content-Type': 'application/json','Accept': 'application/json'};
    default: return {'Content-Type': 'application/x-www-form-urlencoded; charset = UTF-8'};
  }
}

const setConfig = (function_caller_name, method, url, credentials, headers, DATA) => {
  switch(method){
    case 'POST': return { method, headers, url, body: DATA};
    case 'GET': return { method: 'GET', headers, url, params: DATA, query: DATA };
    default: return { method, headers, url, credentials, body: JSON.stringify({request: 'GetMap'})};
  }
}

const setURL = (function_caller_name, BASE_URL, data_serialized) => {
  switch(function_caller_name){
    case 'getTreeListMap': return `${BASE_URL}?${data_serialized}`;
    case 'getTree': return `${BASE_URL}?${data_serialized}`;
    default: return BASE_URL;
  }
}

const formatBody = async (response, function_caller_name) => {
  const functionName = `formatBody`;
  try {
    // console.log(functionName,'response', await response, function_caller_name);
    let body = await response.text();
    // const body = JSON.parse(body.slice(1, -1))[0];
    // console.log(functionName,' RESPONSE body', body, 'private eyes are watching you');
    switch(function_caller_name){
      case 'test': return JSON.parse(await body);
      default: return await body;
    }
  } catch(error) {
    console.log(functionName, error);
  }
}

export const fetchActionGet = (CB_REQUEST, CB_SUCCESS, CB_FAIL, METHOD, BASE_URL, DATA, function_caller_name) => {
  const functionName = `fetchActionGet`;
  const username = DATA.username || null;
  // console.log('\n\n\n\n', functionName, function_caller_name, 'EMAIL', EMAIL, '\n\n\n\n');
  const data_serialized = serializeData(DATA);

  // console.log('\n\n\n\n', functionName, function_caller_name, 'data_serialized', data_serialized, '\n\n\n\n');
  const URL = setURL(function_caller_name, BASE_URL, data_serialized);
  // console.log('\n\n\n\n', functionName, function_caller_name, 'URL', URL, '\n\n\n\n');
  // const URL = BASE_URL;
  const headers = setHeaders(function_caller_name);
  const config = setConfig(function_caller_name, METHOD, URL, 'include', headers, DATA);
  // console.log('\n\n\n\n', functionName, 'config', config, function_caller_name, 'Glue on\n\n\n\n');
  return async dispatch => {
    try {
      dispatch(CB_REQUEST(username));
      const response = await fetch(URL, config)
      // console.log(functionName,' \n\n\n tictik RESPONSE', await response.body);
      // const body = formatBody(await response, function_caller_name);
      const body = await response.text();
      console.log('\n\n\n\n RESPONSE', functionName, await body, functionName, ' RESPONSE body TIKTOK2\n\n\n\n');
      // const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body, functionName, function_caller_name);
      if ( await !response) {
        dispatch(CB_FAIL('network error'));
        return await 'network error';
      }
      if ( await !response.status || await response.status !== 200 ) { 
        // console.log(functionName, 'ERROR from here:', await response.error, 'caller:', function_caller_name);
        dispatch(CB_FAIL(await response));
        return await response;
      } else if (body.hasOwnProperty('error') && body.error !== '' || await body.authfail === true) {
        // console.log(functionName, 'ERROR 22:', 'body.error',  await body.error, 'body.authfail:',await body.authfail, 'caller:', function_caller_name);
        dispatch(CB_FAIL(await body));
        return await body;
      } 

      // console.log(functionName, 'SUCCESS', 'EMAIL',await body.email, await response.status, await body, 'caller:', function_caller_name, 'success');
      dispatch(CB_SUCCESS(await body));
      return await body;
    } catch(error) {
      console.log('ACTION CATCH ERROR', functionName, error, function_caller_name);
      // dispatch(CB_FAIL(error));
      return error;
    }
  }
}

export const fetchActionPost = (CB_REQUEST, CB_SUCCESS, CB_FAIL, METHOD, BASE_URL, DATA, EMAIL, function_caller_name ) => {
  const functionName = `fetchActionPost --- ${function_caller_name} --`;
  // console.log('\n\n\n\n', functionName, 'EMAIL', EMAIL, '\n\n\n\n');
  const data_serialized = serializeData(DATA);
  const URL = setURL(function_caller_name, BASE_URL, data_serialized);
  const headers = setHeaders(function_caller_name);
  const config = setConfig(function_caller_name, METHOD, URL, 'include', headers, data_serialized);

  // console.log(functionName, 'config', config, function_caller_name);
  return async dispatch => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config)
      // console.log(functionName,'response', await response, function_caller_name, 'tuckers house');
      let body = formatBody(await response, function_caller_name);
      // console.log(functionName,' RESPONSE body', await body, 'private eyes are watching you');
      if ( await !response) {
        dispatch(CB_FAIL('network error'));
        return await 'network error';
      }
      if ( await !response.status || await response.status !== 200 ) { 
        // console.log(functionName, 'ERROR:', await response.statusText);
        dispatch(CB_FAIL(await response.status));
        return await response.status;
      } else if (body.hasOwnProperty('error') && body.error !== '' || await body.authfail === true) {
        dispatch(CB_FAIL(await body));
        return await body;
      } else {
        // console.log(functionName, 'SUCCESS', await response.status, await body.message);
        dispatch(CB_SUCCESS(await body));
        return await body;
      }
      return;
    } catch(error) {
      console.log('ACTION CATCH ERROR', functionName, error);
    }
  }
}



export const getDashboardAPI = (CB_REQUEST, CB_SUCCESS, CB_FAIL, METHOD, BASE_URL, DATA, EMAIL, function_caller_name,) => {
  const functionName = 'ACTION - getDashboardAPI -|';
  // console.log(functionName, function_caller_name, 'METHOD', METHOD, 'EMAIL', EMAIL);
  
  const URL = `${BASE_URL}?email=${encodeURIComponent(EMAIL)}`;
  // const URL = BASE_URL;
  // console.log(functionName, function_caller_name, 'URL', URL, 'laksjdfhlaksjdhflaksjdhflaksjdhf');

  const config = {
    method: METHOD,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'Accept': 'application/json'},
     credentials: 'include',
    // body: {email: EMAIL, id: ID},
    params: {email: EMAIL},
    query: {email: EMAIL},
    // params: JSON.stringify({email: EMAIL, id: ID}),
    // query: JSON.stringify({email: EMAIL, id: ID}),
    url: URL
  }

  // console.log(functionName, function_caller_name, 'config', config, 'WHAT');

  return async dispatch => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config)

      // console.log('\n\n\n\n RESPONSE', functionName, await response, functionName, ' RESPONSE CLOCK1\n\n\n\n');
      const body_string = await response.text();
      // console.log('\n\n\n\n RESPONSE', functionName, await body_string, functionName, ' RESPONSE body_string TIKTOK2\n\n\n\n');
      const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body,' RESPONSE body dashboard!!');
      if ( await !response.status || await response.status !== 200 ) { 
      // if ( await !response.status || await response.status !== 200 || await body.authfail === true) { 
        // console.log(functionName, '-------ERROR:', await response.statusText);
        dispatch(CB_FAIL(await await response.statusText));
        return await await response.statusText;
      } else if (body.hasOwnProperty('error') && body.error !== '') {
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      } else if (body.hasOwnProperty('feedbackresult')) {
        // console.log(functionName, 'SUCCESS', await response.status, await body.message);
        dispatch(CB_SUCCESS(await body.result));
        return await body;
      } 
        // console.log(functionName, 'SUCCESS', await response.status, await body.message);
      dispatch(CB_SUCCESS(await body));
      return await body;
      
    } catch(error) {
      console.log(functionName, 'CATCH ERROR', error);
      dispatch(CB_FAIL(error));
      return error;
    }
  }
}

export const getDashboardAPITEST = (CB_REQUEST, CB_SUCCESS, CB_FAIL, METHOD, BASE_URL, DATA, EMAIL, function_caller_name,) => {
  const functionName = 'ACTION - getDashboardAPI -|';
  // console.log(functionName, 'METHOD', METHOD, 'EMAIL', EMAIL, function_caller_name);
  const data_serialized = serializeData(DATA);
  const URL = `${BASE_URL}?${data_serialized}`;
  // const URL = BASE_URL;
  // console.log(functionName,  'URL', URL, 'laksjdfhlaksjdhflaksjdhflaksjdhf', function_caller_name);
  // console.log(functionName,  'METHOD', METHOD,'URL', URL,'EMAIL',EMAIL,'DATA',DATA, 'laksjdfhlaksjdhflaksjdhflaksjdhf', function_caller_name);
  const config = {
    method: METHOD,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'Accept': 'application/json'},
    credentials: 'include',
    params: DATA,
    query: DATA,
    url: URL
  }
  // console.log(functionName, 'config', config, 'WHAT', function_caller_name);
  return async dispatch => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config)
      // console.log('\n\n\n\n RESPONSE', functionName, await response, functionName, function_caller_name, 'RESPONSE-----------------ASDFASDFASDF\n\n\n\n');
      const body_string = await response.text();
      // console.log('\n\n\n\n RESPONSE', functionName, await body_string, functionName, function_caller_name, 'RESPONSE body_string-----------------\n\n\n\n');
      const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body, function_caller_name, 'RESPONSE body');
      if ( await !response.status || await response.status !== 200 ) { 
      // if ( await !response.status || await response.status !== 200 || await body.authfail === true) { 
        // console.log(functionName, '-------ERROR:', await response.statusText);
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      } else if (body.hasOwnProperty('error') && body.error !== '') {
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      } 
        // console.log(functionName, 'SUCCESS', await response.status, await body.message);
        dispatch(CB_SUCCESS(await body));
        return await body;
      
    } catch(error) {
      console.log(functionName, 'CATCH ERROR', error);
    }
  }
}