const http = require('http');
const express = require('express');

const app = express();
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const { logger.info } = require('../logger.js');
const env = process.argv[2] || 'local';
const host = {
  dev: 'http://localhost',
  production: 'http://localhost',
  blue: 'http://localhost',
  localserver: 'http://localhost',
  docker: 'http://localhost',
}[env];
const port = {
  production: 3001, 
  blue: 3000, 
  dev: 3001, 
  local: 3001, 
  localserver: 3000, 
  docker: 3000,
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

const httpServer = http.createServer(app);
httpServer.listen(port, () => logger.info(`${host}:${port}`));
