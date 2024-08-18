const express = require('express')
const app = express()
let {createProxyMiddleware} = require('http-proxy-middleware');
const {map} = require('./routeMapping/routeMapping.json');
const {routes} = require('./config.json');
const axios = require('axios');




// Body Parser
// app.use(express.urlencoded({ limit: '50mb', extended: false }))
// app.use(express.json())

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));


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




module.exports = app