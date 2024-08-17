const express  = require('express');
const app =express();
let {createProxyMiddleware} = require('http-proxy-middleware');
const {map} = require('./routeMapping/routeMapping.json');
const {routes} = require('./config.json');
const axios = require('axios');
require('dotenv').config();
const port = process.env.port || 3000;

app.get('/_health', async (req, res) => {
    console.log(req.hostname)
    const userData = await axios.get('http://localhost:7000/user/test')
    const productData = await axios.get('http://localhost:4000/product/test')
    const customerData = await axios.get('http://localhost:6000/customer/test')
    res.status(200).json({
        user: userData.data,
        product: productData.data,
        customer: customerData.data,
        createProxyMiddleware : true
    });
})

app.get('/test-proxy', async (req, res) => {
    
    res.status(200).json({
        "msg": "proxy working fine"
    });
})


for(let routeMap of map){
    const service = routeMap.service;
    const route = routes.filter(val=>val.route == service);
    const endPoint = routeMap.route
    for(let currentRoute of endPoint){
        app.use(currentRoute, createProxyMiddleware({target: route[0].address, changeOrigin: true}))
    }
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


app.listen(port,()=>{
    console.log(`proxy listen to the port ${port}`)
})


