require('dotenv').config();
const express = require('express');
const { initDB } = require('./config/database');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'booking-service' }));
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 3002;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`booking-service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
