const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'localhost': 'local',
}[window.location.hostname];
// console.log('\n\n\n\n env', env, window.location.hostname);
const port = { prod: 3100, dev: 3443, local: 3002 }[env];

const url = {
  live: 'https://waterthetrees.com',
  dev: `https://dev.waterthetrees.com:${port}`,
  local: `http://localhost:${port}`,
}[env];
// console.log('\n\n\n\n url', url);

const apiEndpoints = {
  urlUser: `${url}/user`,
  urlLogin: `${url}/userhistory`,
  urlCustomer: `${url}/userprofile`,
  treemap: `${url}/treemap`,
  tree: `${url}/tree`,
  treehistory: `${url}/treehistory`,
}
// console.log(' \n\n\n\n apiEndpoints', apiEndpoints.treemap);

export default apiEndpoints;