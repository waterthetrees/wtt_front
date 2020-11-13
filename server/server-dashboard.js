const http = require('http');
const https = require('https');
const express = require('express');

const app = express();
const fs = require('fs');
const morgan = require('morgan');
const { logger } = require('../logger.js');
util = require('util');

// usage: node stripe_webhook_server.js prod or node stripe_webhook_server.js for dev
const env = process.argv[2] || 'local';
const host = {
  prod: 'http://waterthetrees.com',
  dev: 'http://dev.waterthetrees.com',
  local: 'http://localhost',
  blue: 'http://localhost',
}[env];
const port = {
  prod: 3100, blue: 3000, dev: 3443, local: 3000,
}[env];

app.use(morgan('dev'));
app.use('/', express.static('client/public'));

const options = {
  // cert : fs.readFileSync('/etc/letsencrypt/live/dev.100ktrees.com/fullchain.pem'),
  // key  : fs.readFileSync('/etc/letsencrypt/live/dev.100ktrees.com/privkey.pem'),
  // cert : fs.readFileSync("./fullchain.pem"),
  // key  : fs.readFileSync("./privkey.pem"),
  NPNProtocols: ['http/2.0', 'spdy', 'http/1.1', 'http/1.0'],
};

const httpServer = http.createServer(app);
const server = httpServer.listen(port, () => logger.log('info', `${host}:${port}`));

// const httpsServer = https.createServer(options, app);
// const server = httpsServer.listen(port, () => logger.log('info', `${host}:${port}`));
