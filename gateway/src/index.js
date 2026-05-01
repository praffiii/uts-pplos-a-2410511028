require('dotenv').config();
const express = require('express');
const rateLimiter = require('./middlewares/rateLimiter');
const authMiddleware = require('./middlewares/auth');
const setupRoutes = require('./routes/index');

const app = express();
app.use(express.json());

app.use(rateLimiter);
app.use(authMiddleware);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'gateway' }));

setupRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`gateway running on port ${PORT}`);
});
