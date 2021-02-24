const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'blue.waterthetrees.com': 'blue',
  localhost: 'localserver',
  // localhost: 'docker',
}[window.location.hostname];

// const port = { localserver: 3002 }[env];

const url = {
  prod: 'https://waterthetrees.com/api',
  dev: 'https://dev.waterthetrees.com/api',
  blue: 'https://blue.waterthetrees.com/api',
  localserver: 'http://localhost:3002/api',
  docker: 'http://localhost:3002/api',
}[env];
// console.log(env, port, url);

const apiEndpoints = {
  user: `${url}/user`,
  userhistory: `${url}/userhistory`,
  userprofile: `${url}/userprofile`,
  treemap: `${url}/treemap`,
  tree: `${url}/tree`,
  treehistory: `${url}/treehistory`,
  treelist: `${url}/treelist`,
};
export default apiEndpoints;
