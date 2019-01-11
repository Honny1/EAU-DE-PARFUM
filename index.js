/* eslint semi: "error" */
const config = require('./config.js');
const server = require('./server');

server.listen(config.port, () => {
  console.log(`server run on: http://127.0.0.1:${config.port}`);
});
