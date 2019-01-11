/* eslint semi: "error" */
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

function returnData (req, res) {
  res.send(req.query.data + ';' + req.query.parfem);
}

function returnMixPage (req, res) {
  res.sendfile('./html/mix.html');
}

function returnAdminPage (req, res) {
  res.send('AdminPage-NotImplemented');
}

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.sendfile('./html/index.html');
});

server.get('/data', returnData);

server.get('/mix', returnMixPage);
server.get('/admin', returnAdminPage);
module.exports = server;
