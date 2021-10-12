const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://59.12.7.180',
            changeOrigin: true,
        }),
    );
};
