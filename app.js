const express  = require('express');
const app =express();
const router = require('express').Router()
let {createProxyMiddleware} = require('http-proxy-middleware');
const {map} = require('./routeMapping/routeMapping.json');
const {routes} = require('./config.json');
const axios = require('axios');
const http = require('http');
require('dotenv').config();
const port = process.env.port || 3000;
const server = require('./server');

try {
    // creating express server
    const myserver = http.createServer(server)
    myserver.listen(port)
    console.log('Server running..... Port -', port)
} catch (error) {
    console.error(error)
}


// proxy and change the base path from "/api" to "/secret"
// http://127.0.0.1:3000/api/foo/bar -> http://www.example.org/secret/foo/bar

// app.use('/*.jpg', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.png', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.jpeg', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.jpeg', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.JPG', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.JPEG', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.PNG', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.jfif', createProxyMiddleware({ target: routes[1].address }))
// app.use('/*.gif', createProxyMiddleware({ target: routes[1].address }))

// app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://www.example.org/secret',
//       changeOrigin: true,
//     }),
//   );





