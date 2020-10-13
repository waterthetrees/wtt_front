let env = {
  'waterthetrees.com': 'prod',
  'waterthetrees.com': 'dev',
  'dev.waterthetrees.com': 'dev',
  'localhost': 'local',
}[window.location.hostname];
// console.log('\n\n\n\n env', env, window.location.hostname);
// env = 'dev'
const port = { prod: 3100, dev: 3443, local: 3002 }[env];

const url = {
  live: 'https://waterthetrees.com/api',
  dev: `https://dev.waterthetrees.com/api`,
  local: `http://localhost:${port}/api`,
}[env];
// console.log('\n\n\n\n url', url);

const apiEndpoints = {
  urlUser: `${url}/user`,
  urlLogin: `${url}/userhistory`,
  urlCustomer: `${url}/userprofile`,
  treemap: `${url}/treemap`,
  tree: `${url}/tree`,
  treehistory: `${url}/treehistory`,
  treelist: `${url}/treelist`,
}
// console.log(' \n\n\n\n apiEndpoints', apiEndpoints.treemap);

export default apiEndpoints;
