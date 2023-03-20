const http = require('http');
const express = require('express');

const app = express();
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const { logger } = require('./logger');

const env = process.argv[2] || 'localhost';
const host = {
  development: 'http://localhost',
  production: 'http://localhost',
  localhost: 'http://localhost',
  docker: 'http://localhost',
  blue: 'http://localhost',
}[env];
const port = {
  production: 3001,
  development: 3001,
  localhost: 3001,
  docker: 3001,
  blue: 3000,
}[env];

app.use(compression());
app.use(morgan('dev'));
app.use('/', express.static('client/public'));
app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/public/index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => logger.info(`${host}:${port}`));
