const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'blue.waterthetrees.com': 'blue',
  localhost: 'dev',
}[window.location.hostname];
// console.log('\n\n\n\n env', env, window.location.hostname);

const port = { prod: 3100, dev: 3443, local: 3002 }[env];

const url = {
  prod: 'https://waterthetrees.com/api',
  dev: 'https://dev.waterthetrees.com/api',
  blue: 'https://blue.waterthetrees.com/api',
  local: `http://localhost:${port}/api`,
}[env];
// console.log('\n\n\n\n url', url);

const apiEndpoints = {
  user: `${url}/user`,
  userhistory: `${url}/userhistory`,
  userprofile: `${url}/userprofile`,
  treemap: `${url}/treemap`,
  tree: `${url}/tree`,
  treehistory: `${url}/treehistory`,
  treelist: `${url}/treelist`,
};
console.log(' \n\n\n\n apiEndpoints', apiEndpoints.treemap);

export default apiEndpoints;
