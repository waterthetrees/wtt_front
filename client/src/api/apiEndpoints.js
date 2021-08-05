export const env = {
  'waterthetrees.com': 'prod',
  'dev.waterthetrees.com': 'dev',
  'blue.waterthetrees.com': 'blue',
  localhost: 'docker',
}[window.location.hostname];

export const url = {
  prod: 'https://waterthetrees.com',
  dev: 'https://dev.waterthetrees.com',
  blue: 'https://blue.waterthetrees.com',
  localserver: 'http://localhost',
  docker: 'http://localhost',
}[env];

export const port = {
  prod: '',
  dev: '',
  blue: '',
  localserver: ':3002',
  docker: ':3002',
}[env];

export const tilesServerEndpoints = {
  localserver: `${url}:3001`,
  docker: `${url}:3001`,
  dev: `${url}/tiles`,
  local: `${url}:3001`,
  blue: `${url}/tiles`,
  prod: `${url}/tiles`,
}[env];

//should line 46 be city: `${url}${port}/api/cities`, or city: `${url}${port}/api/city`,
const apiEndpoints = {
  user: `${url}${port}/api/user`,
  userhistory: `${url}${port}/api/userhistory`,
  userprofile: `${url}${port}/api/userprofile`,
  treemap: `${url}${port}/api/treemap`,
  tree: `${url}${port}/api/tree`,
  treehistory: `${url}${port}/api/treehistory`,
  treelist: `${url}${port}/api/treelist`,
  treeadoption: `${url}${port}/api/treeuser`,
  treelikes: `${url}${port}/api/treeuser`,
  treecount: `${url}${port}/api/treecount`,
  cities: `${url}${port}/api/cities`,
  city: `${url}${port}/api/cities`,
  register: `${url}${port}/api/register`
};

export default apiEndpoints;
