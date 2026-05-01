const { createProxyMiddleware } = require('http-proxy-middleware');

// Each proxy restores the path prefix that Express strips when using app.use('/prefix', proxy)
const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => '/auth' + path,
});

const propertiesProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => '/api/properties' + path,
});

const roomsProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => '/api/rooms' + path,
});

const bookingsProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => '/bookings' + path,
});

const paymentsProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => '/payments' + path,
});

const setupRoutes = (app) => {
  app.use('/auth', authProxy);
  app.use('/properties', propertiesProxy);
  app.use('/rooms', roomsProxy);
  app.use('/bookings', bookingsProxy);
  app.use('/payments', paymentsProxy);
};

module.exports = setupRoutes;
