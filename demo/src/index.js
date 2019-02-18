#!/usr/bin/env node

import http from 'http'
import app from './app'

//create node.js http server and listen on port
const server = http.createServer(app()).listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('umi mock serve at http://%s:%s', host, port);
});
