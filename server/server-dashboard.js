const http = require('http');
// const https = require('https');
const express = require('express');

const app = express();
// const fs = require('fs');
const morgan = require('morgan');
// const util = require('util');
const path = require('path');
const compression = require('compression');
const { logger } = require('../logger.js');
// usage: node stripe_webhook_server.js prod or node stripe_webhook_server.js for dev
const env = process.argv[2] || 'local';
const host = {
  dev: 'http://localhost',
  prod: 'http://localhost',
  blue: 'http://localhost',
  localserver: 'http://localhost',
  docker: 'http://localhost',
}[env];
const port = {
  prod: 3001, blue: 3000, dev: 3001, local: 3001, localserver: 3000, docker: 3000,
}[env];

app.use(compression());
app.use(morgan('dev'));
app.use('/', express.static('client/public'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// const options = {
// cert : fs.readFileSync('/etc/letsencrypt/live/dev.100ktrees.com/fullchain.pem'),
// key  : fs.readFileSync('/etc/letsencrypt/live/dev.100ktrees.com/privkey.pem'),
// cert : fs.readFileSync("./fullchain.pem"),
// key  : fs.readFileSync("./privkey.pem"),
//   NPNProtocols: ['http/2.0', 'spdy', 'http/1.1', 'http/1.0'],
// };

const httpServer = http.createServer(app);
httpServer.listen(port, () => logger.log('info', `${host}:${port}`));

// const httpsServer = https.createServer(options, app);
// const server = httpsServer.listen(port, () => logger.log('info', `${host}:${port}`));
