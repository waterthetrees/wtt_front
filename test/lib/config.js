// const env = process.argv[2] || 'local';
const env = 'local';
const URL_base = { prod:'https://live.treeme.com', dev: 'https://dev.treeme.com', local:'http://tbreact.ngrok.io/#' }[env];
const URL_base_private = { prod:'https://live.treeme.com/#/app', dev: 'https://dev.treeme.com/#/app', local:'http://localhost/#/app' }[env];

module.exports = {
  // baseURL: 'https://dev.treeme.com:6443/',
  routes: {
    public: {
      login: `${URL_base}/login`,
      setpassword: `${URL_base}/setpassword`,
      forgot: `${URL_base}/forgot`,
      newmember: `${URL_base}/NewMember`,
      newpassword: `${URL_base}/NewPassword`,
      noMatch: `${URL_base}/asdf`,
    },
    private: {
      alerts: `${URL_base_private}/alerts`,
      home: `${URL_base_private}/home`,
      payments: `${URL_base_private}/payment`,
      address: `${URL_base_private}/address`,
      style: `${URL_base_private}/style`,
      loyalty: `${URL_base_private}/loyalty`,
      tracking: `${URL_base_private}/tracking`,
      feedback: `${URL_base_private}/feedback`,
    },
    admin: {
      // templates: `${appUrlBase}/templates`,
    },
  },

  isHeadless: true,
  slowMo: 0,
  isDevTools: false,
  launchTimeout: 90000,
  waitingTimeout: 90000,
  viewportWidth: 800,
  viewportHeight: 800,
  CREDENTIALS: {email: 'test@test.com', password: 'test'}
}

// const appUrlBase = 'http://localhost:4000'
// const r
