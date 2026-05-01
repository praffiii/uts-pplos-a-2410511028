const { createProxyMiddleware } = require('http-proxy-middleware');

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/auth',
});

const propertiesProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/properties',
  pathRewrite: { '^/properties': '/api/properties' },
  on: {
    proxyReq: (proxyReq) => { proxyReq.setHeader('Accept', 'application/json'); },
  },
});

const roomsProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/rooms',
  pathRewrite: { '^/rooms': '/api/rooms' },
  on: {
    proxyReq: (proxyReq) => { proxyReq.setHeader('Accept', 'application/json'); },
  },
});

const ownersProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/owners',
  pathRewrite: { '^/owners': '/api/owners' },
  on: {
    proxyReq: (proxyReq) => { proxyReq.setHeader('Accept', 'application/json'); },
  },
});

const bookingsProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/bookings',
});

const paymentsProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/payments',
});

const setupRoutes = (app) => {
  app.use(authProxy);
  app.use(propertiesProxy);
  app.use(roomsProxy);
  app.use(ownersProxy);
  app.use(bookingsProxy);
  app.use(paymentsProxy);
};

module.exports = setupRoutes;
