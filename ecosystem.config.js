module.exports = {
  apps : [{
    script: 'server/index.js',
    name: 'wtt_front',
    instances: 'max',
    exec_mode: 'fork',
    node_args: '--require dotenv/config',
    env: {
      NODE_ENV: 'development',
    },
    env_development: {
      DOTENV_CONFIG_DEBUG: true,
      DOTENV_CONFIG_PATH: '/var/www/html/dev.waterthetrees.com/wtt_front/.env',
    }
  }],
  deploy : {
    production : {
      user : 'trees',
      host : 'localhost',
      ref  : 'origin/main',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },
    development : {
      user : 'trees',
      host : 'localhost',
      ref  : 'origin/development',
      'pre-deploy-local': '',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env development',
      'pre-setup': ''
    },
  }
};
