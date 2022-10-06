module.exports = {
  apps: [
    {
      script: 'server/index.js',
      name: 'wtt_front',
      instances: 'max',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
  deploy: {
    production: {
      user: 'trees',
      host: 'localhost',
      ref: 'origin/main',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
    development: {
      user: 'trees',
      host: 'localhost',
      ref: 'origin/development',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && pm2 start ecosystem.config.js --env development',
      'pre-setup': '',
    },
  },
};
