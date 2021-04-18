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
  localserver: 'http://localhost:3002',
  docker: 'http://localhost:3002',
}[env];
// console.log('env', env, 'url', url);

const apiEndpoints = {
  user: `${url}/api/user`,
  userhistory: `${url}/api/userhistory`,
  userprofile: `${url}/api/userprofile`,
  treemap: `${url}/api/treemap`,
  tree: `${url}/api/tree`,
  treehistory: `${url}/api/treehistory`,
  treelist: `${url}/api/treelist`,
  treeadoption: `${url}/api/treeuser`,
  treelikes: `${url}/api/treeuser`,
};

// console.log('apiEndpoints', apiEndpoints);
export default apiEndpoints;
