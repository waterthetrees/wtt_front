export const FUNCTION_ACTION = 'ACTION';

export const serializeData = (data) =>
  // console.log(data,'serializeData');
  Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');
const setHeaders = (functionCallerName) => {
  switch (functionCallerName) {
  case 'getTreeListMap':
    return { 'Content-Type': 'application/json', Accept: 'application/json' };
  case 'getTree':
    return { 'Content-Type': 'application/json', Accept: 'application/json' };
  default:
    return {
      'Content-Type': 'application/x-www-form-urlencoded; charset = UTF-8',
    };
  }
};

const setConfig = (
  functionCallerName,
  method,
  url,
  credentials,
  headers,
  DATA,
) => {
  switch (method) {
  case 'POST':
    return {
      method, headers, url, body: DATA,
    };
  case 'GET':
    return {
      method: 'GET', headers, url, params: DATA, query: DATA,
    };
  default:
    return {
      method,
      headers,
      url,
      credentials,
      body: JSON.stringify({ request: 'GetMap' }),
    };
  }
};

const setURL = (functionCallerName, BASE_URL, dataSerialized) => {
  switch (functionCallerName) {
  case 'getTreeListMap':
    return `${BASE_URL}?${dataSerialized}`;
  case 'getTree':
    return `${BASE_URL}?${dataSerialized}`;
  default:
    return BASE_URL;
  }
};

const formatBody = async (response, functionCallerName) => {
  const functionName = 'formatBody';
  try {
    // console.log(functionName,'response', await response, functionCallerName);
    const body = await response.text();
    // const body = JSON.parse(body.slice(1, -1))[0];
    // console.log(functionName,' RESPONSE body', body, 'private eyes are watching you');
    switch (functionCallerName) {
    case 'test':
      return JSON.parse(await body);
    default:
      return await body;
    }
  } catch (error) {
    console.log(functionName, error);
  }
};

export const fetchActionGet = (
  CB_REQUEST,
  CB_SUCCESS,
  CB_FAIL,
  METHOD,
  BASE_URL,
  DATA,
  functionCallerName,
) => {
  const functionName = 'fetchActionGet';
  const username = DATA.username || null;
  // console.log('\n\n\n\n', functionName, functionCallerName, 'EMAIL', EMAIL, '\n\n\n\n');
  const dataSerialized = serializeData(DATA);

  const URL = setURL(functionCallerName, BASE_URL, dataSerialized);
  // console.log('\n\n\n\n', functionName, functionCallerName, 'URL', URL, '\n\n\n\n');
  // const URL = BASE_URL;
  const headers = setHeaders(functionCallerName);
  const config = setConfig(
    functionCallerName,
    METHOD,
    URL,
    'include',
    headers,
    DATA,
  );
  // console.log('\n\n\n\n', functionName, 'config', config, functionCallerName, 'Glue on\n\n\n\n');
  return async (dispatch) => {
    try {
      dispatch(CB_REQUEST(username));
      const response = await fetch(URL, config);
      // console.log(functionName,' \n\n\n tictik RESPONSE', await response.body);
      // const body = formatBody(await response, functionCallerName);
      const body = await response.text();
      console.log(
        '\n\n\n\n RESPONSE',
        functionName,
        await body,
        functionName,
        ' RESPONSE body TIKTOK2\n\n\n\n',
      );
      // const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body, functionName, functionCallerName);
      if (await !response) {
        dispatch(CB_FAIL('network error'));
        return await 'network error';
      }
      if ((await !response.status) || (await response.status) !== 200) {
        // console.log(functionName, 'ERROR from here:', await response.error, 'caller:', functionCallerName);
        dispatch(CB_FAIL(await response));
        return await response;
      } if (
        (body.hasOwnProperty('error') && body.error !== '')
        || (await body.authfail) === true
      ) {
        // console.log(functionName, 'ERROR 22:', 'body.error',  await body.error, 'body.authfail:',await body.authfail, 'caller:', functionCallerName);
        dispatch(CB_FAIL(await body));
        return await body;
      }

      // console.log(functionName, 'SUCCESS', 'EMAIL',await body.email, await response.status, await body, 'caller:', functionCallerName, 'success');
      dispatch(CB_SUCCESS(await body));
      return await body;
    } catch (error) {
      console.log(
        'ACTION CATCH ERROR',
        functionName,
        error,
        functionCallerName,
      );
      // dispatch(CB_FAIL(error));
      return error;
    }
  };
};

export const fetchActionPost = (
  CB_REQUEST,
  CB_SUCCESS,
  CB_FAIL,
  METHOD,
  BASE_URL,
  DATA,
  EMAIL,
  functionCallerName,
) => {
  const functionName = `fetchActionPost --- ${functionCallerName} --`;
  // console.log('\n\n\n\n', functionName, 'EMAIL', EMAIL, '\n\n\n\n');
  const dataSerialized = serializeData(DATA);
  const URL = setURL(functionCallerName, BASE_URL, dataSerialized);
  const headers = setHeaders(functionCallerName);
  const config = setConfig(
    functionCallerName,
    METHOD,
    URL,
    'include',
    headers,
    dataSerialized,
  );

  // console.log(functionName, 'config', config, functionCallerName);
  return async (dispatch) => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config);
      // console.log(functionName,'response', await response, functionCallerName, 'tuckers house');
      const body = formatBody(await response, functionCallerName);
      // console.log(functionName,' RESPONSE body', await body, 'private eyes are watching you');
      if (await !response) {
        dispatch(CB_FAIL('network error'));
        return await 'network error';
      }
      if ((await !response.status) || (await response.status) !== 200) {
        // console.log(functionName, 'ERROR:', await response.statusText);
        dispatch(CB_FAIL(await response.status));
        return await response.status;
      } if (
        (body.hasOwnProperty('error') && body.error !== '')
        || (await body.authfail) === true
      ) {
        dispatch(CB_FAIL(await body));
        return await body;
      }
      // console.log(functionName, 'SUCCESS', await response.status, await body.message);
      dispatch(CB_SUCCESS(await body));

      return;
    } catch (error) {
      console.log('ACTION CATCH ERROR', functionName, error);
    }
  };
};

export const getDashboardAPI = (
  CB_REQUEST,
  CB_SUCCESS,
  CB_FAIL,
  METHOD,
  BASE_URL,
  DATA,
  EMAIL,
  functionCallerName,
) => {
  const functionName = 'ACTION - getDashboardAPI -|';
  // console.log(functionName, functionCallerName, 'METHOD', METHOD, 'EMAIL', EMAIL);

  const URL = `${BASE_URL}?email=${encodeURIComponent(EMAIL)}`;
  // const URL = BASE_URL;
  // console.log(functionName, functionCallerName, 'URL', URL, 'laksjdfhlaksjdhflaksjdhflaksjdhf');

  const config = {
    method: METHOD,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'Accept': 'application/json'},
    credentials: 'include',
    // body: {email: EMAIL, id: ID},
    params: { email: EMAIL },
    query: { email: EMAIL },
    // params: JSON.stringify({email: EMAIL, id: ID}),
    // query: JSON.stringify({email: EMAIL, id: ID}),
    url: URL,
  };

  // console.log(functionName, functionCallerName, 'config', config, 'WHAT');

  return async (dispatch) => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config);

      // console.log('\n\n\n\n RESPONSE', functionName, await response, functionName, ' RESPONSE CLOCK1\n\n\n\n');
      const body_string = await response.text();
      // console.log('\n\n\n\n RESPONSE', functionName, await body_string, functionName, ' RESPONSE body_string TIKTOK2\n\n\n\n');
      const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body,' RESPONSE body dashboard!!');
      if ((await !response.status) || (await response.status) !== 200) {
        // if ( await !response.status || await response.status !== 200 || await body.authfail === true) {
        // console.log(functionName, '-------ERROR:', await response.statusText);
        dispatch(CB_FAIL(await await response.statusText));
        return await await response.statusText;
      } if (body.hasOwnProperty('error') && body.error !== '') {
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      } if (body.hasOwnProperty('feedbackresult')) {
        // console.log(functionName, 'SUCCESS', await response.status, await body.message);
        dispatch(CB_SUCCESS(await body.result));
        return await body;
      }
      // console.log(functionName, 'SUCCESS', await response.status, await body.message);
      dispatch(CB_SUCCESS(await body));
      return await body;
    } catch (error) {
      console.log(functionName, 'CATCH ERROR', error);
      dispatch(CB_FAIL(error));
      return error;
    }
  };
};

export const getDashboardAPITEST = (
  CB_REQUEST,
  CB_SUCCESS,
  CB_FAIL,
  METHOD,
  BASE_URL,
  DATA,
  EMAIL,
  functionCallerName,
) => {
  const functionName = 'ACTION - getDashboardAPI -|';
  // console.log(functionName, 'METHOD', METHOD, 'EMAIL', EMAIL, functionCallerName);
  const dataSerialized = serializeData(DATA);
  const URL = `${BASE_URL}?${dataSerialized}`;
  // const URL = BASE_URL;
  // console.log(functionName,  'URL', URL, 'laksjdfhlaksjdhflaksjdhflaksjdhf', functionCallerName);
  // console.log(functionName,  'METHOD', METHOD,'URL', URL,'EMAIL',EMAIL,'DATA',DATA, 'laksjdfhlaksjdhflaksjdhflaksjdhf', functionCallerName);
  const config = {
    method: METHOD,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    credentials: 'include',
    params: DATA,
    query: DATA,
    url: URL,
  };
  // console.log(functionName, 'config', config, 'WHAT', functionCallerName);
  return async (dispatch) => {
    try {
      dispatch(CB_REQUEST(EMAIL));
      const response = await fetch(URL, config);
      // console.log('\n\n\n\n RESPONSE', functionName, await response, functionName, functionCallerName, 'RESPONSE-----------------ASDFASDFASDF\n\n\n\n');
      const body_string = await response.text();
      // console.log('\n\n\n\n RESPONSE', functionName, await body_string, functionName, functionCallerName, 'RESPONSE body_string-----------------\n\n\n\n');
      const body = await JSON.parse(await body_string);
      // console.log(functionName,' RESPONSE body', await body, functionCallerName, 'RESPONSE body');
      if ((await !response.status) || (await response.status) !== 200) {
        // if ( await !response.status || await response.status !== 200 || await body.authfail === true) {
        // console.log(functionName, '-------ERROR:', await response.statusText);
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      } if (body.hasOwnProperty('error') && body.error !== '') {
        dispatch(CB_FAIL(await body.error));
        return await body.error;
      }
      // console.log(functionName, 'SUCCESS', await response.status, await body.message);
      dispatch(CB_SUCCESS(await body));
      return await body;
    } catch (error) {
      console.log(functionName, 'CATCH ERROR', error);
    }
  };
};
