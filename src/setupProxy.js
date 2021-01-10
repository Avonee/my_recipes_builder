// import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function (app) {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://www.recipepuppy.com',
            changeOrigin: true,
        })
    );
};