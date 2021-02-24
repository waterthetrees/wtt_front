/* eslint-disable max-len */

const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'local',
  'blue.waterthetrees.com': 'blue',
  localhost: 'localserver',
}[window.location.hostname];

const mapbox = {
  // key: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w'
  live: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrY3lmcWVqcDA5ZDYyenFpdG13bWdrOHYifQ.6er3tXeahhVUtgiu_pqWFw',
  dev: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w',
  blue: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w',
  localserver: 'pk.eyJ1IjoiMTAwa3RyZWVzIiwiYSI6ImNrNzFqdWFpeDA2cDQzbnF3amtoM2xrdzQifQ.XEXk0ePKHFgN8rp1YHNn4w',
}[env];

const auth0 = {
  live: {
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

const config = { mapbox, auth0 };
// console.log('config', config);
export default config;
