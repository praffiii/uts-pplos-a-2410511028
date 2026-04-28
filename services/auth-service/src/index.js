require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { initDB } = require('./config/database');
require('./config/passport');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'session-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

const start = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

start();
