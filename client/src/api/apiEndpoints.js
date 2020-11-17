const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'local',
  'blue.waterthetrees.com': 'blue',
  localhost: 'localserver',
}[window.location.hostname];

const port = { localserver: 3002 }[env];

const url = {
  prod: 'https://waterthetrees.com/api',
  dev: 'https://dev.waterthetrees.com/api',
  blue: 'https://blue.waterthetrees.com/api',
  localserver: `http://localhost:${port}/api`,
}[env];

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
