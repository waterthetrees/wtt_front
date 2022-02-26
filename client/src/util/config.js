/* eslint-disable max-len */

// Default env to localserver in case hostname doesn't match anything, which it may not if we're
// trying to access the local dev server from another machine using the host's address.
const env = {
  'www.waterthetrees.com': 'prod',
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'blue.waterthetrees.com': 'blue',
  localhost: 'localserver',
}[location.hostname] || 'localserver';

const mapboxAccessToken = {
  // key: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w'
  prod: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrY3lmcWVqcDA5ZDYyenFpdG13bWdrOHYifQ.6er3tXeahhVUtgiu_pqWFw',
  dev: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w',
  blue: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNramQxdzV6ZTEwN2YzMXFxZG9rbHdjYTIifQ.wuXVYDeQ7WRqALu-RZxPMg',
  localserver: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w',
}[env];

const auth0 = {
  prod: {
    domain: 'trees.us.auth0.com',
    clientId: 'rUv8qhefpscOANXBfanD0fwSjTMz2ZpW',
  },
  dev: {
    domain: 'treesdev.us.auth0.com',
    clientId: 'GSTMeD1fU2WftUUr0ac73Okss75q8qCr',
  },
  blue: {
    domain: 'treesdev.us.auth0.com',
    clientId: 'GSTMeD1fU2WftUUr0ac73Okss75q8qCr',
  },
  localserver: {
    domain: 'treesdev.us.auth0.com',
    clientId: 'GSTMeD1fU2WftUUr0ac73Okss75q8qCr',
  },
}[env];

export { env, mapboxAccessToken, auth0 };
