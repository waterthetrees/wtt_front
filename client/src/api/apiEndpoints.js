const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'blue.waterthetrees.com': 'blue',
  localhost: 'localserver',
  // localhost: 'docker',
}[window.location.hostname];

// const port = { localserver: 3002 }[env];

export const url = {
  prod: 'https://waterthetrees.com',
  dev: 'https://dev.waterthetrees.com',
  blue: 'https://blue.waterthetrees.com',
  localserver: 'http://localhost',
  docker: 'http://localhost',
}[env];

export const port = (serverName) => ({
  prod: '',
  dev: '',
  blue: '',
  localserver: ':3002',
  docker: ':3002',
  tilesdev: ':3001/tiles',
  tileslocal: ':3001',
}[serverName]);
// console.log('env', env, 'url', url);

const apiEndpoints = {
  user: `${url}${port(env)}/api/user`,
  userhistory: `${url}${port(env)}/api/userhistory`,
  userprofile: `${url}${port(env)}/api/userprofile`,
  treemap: `${url}${port(env)}/api/treemap`,
  tree: `${url}${port(env)}/api/tree`,
  treehistory: `${url}${port(env)}/api/treehistory`,
  treelist: `${url}${port(env)}/api/treelist`,
  treeadoption: `${url}${port(env)}/api/treeuser`,
  treelikes: `${url}${port(env)}/api/treeuser`,
};

// console.log('apiEndpoints', apiEndpoints);
export default apiEndpoints;
