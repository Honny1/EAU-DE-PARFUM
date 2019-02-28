/* eslint semi: "error" */
const config = require('./config.js');
const server = require('./server');
const fs = require('fs'); 
const https = require('https');
const http = require('http');
const keys_dir = 'keys/';
const server_options = {
  key  : fs.readFileSync(keys_dir + 'server.key'),
  cert : fs.readFileSync(keys_dir + 'server.cert')
};
https.createServer(server_options,server).listen(config.HTTPSport, () => {
  console.log(`HTTPS server run on: https://127.0.0.1:${config.HTTPSport}`);
});
http.createServer(server).listen(config.HTTPport, () => {
  console.log(`HTTP server run on: http://127.0.0.1:${config.HTTPport}`);
});
