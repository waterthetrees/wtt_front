const env = {
  'live.100ktrees.org': 'prod',
  'dev.100ktrees.org:3443': 'dev',
  'localhost:3000': 'local',
  'localhost': 'localhost'
}[window.location.hostname];
// console.log('\n\n\n\n env', env, window.location.hostname);

const url = {
  live: 'https://live.100ktrees.org',
  dev: 'https://dev.100ktrees.org:3443',
  local: 'http://localhost:3002',
  localhost: 'http://localhost:3002',
}[env];
// console.log('\n\n\n\n url', url);

export const apiEndpoints = {
    urlUser: `${url}/user`,
    urlLogin: `${url}/userhistory`,
    urlCustomer: `${url}/userprofile`,
    urlTreeMap: `${url}/treemap`,
    urlTree: `${url}/tree`,
    urlTreehistory: `${url}/treehistory`
};
// console.log(' \n\n\n\n apiEndpoints', apiEndpoints);