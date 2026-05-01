const { createProxyMiddleware } = require('http-proxy-middleware');

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
});

const propertyProxy = createProxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/(properties|rooms)/, '/api/$1'),
});

const bookingProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
});

const setupRoutes = (app) => {
  app.use('/auth', authProxy);
  app.use('/properties', propertyProxy);
  app.use('/rooms', propertyProxy);
  app.use('/bookings', bookingProxy);
  app.use('/payments', bookingProxy);
};

module.exports = setupRoutes;
