const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://d2odir2bk23iak.cloudfront.net',
      changeOrigin: true,
    })
  );
};