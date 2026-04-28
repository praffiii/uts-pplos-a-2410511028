const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );
};

const getRefreshTokenExpiry = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Name, email, and password are required' });
  }

  const existing = await User.findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  return res.status(201).json({ message: 'User registered successfully', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: 'Email and password are required' });
  }

  const user = await User.findByEmail(email);
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await RefreshToken.create(user.id, refreshToken, getRefreshTokenExpiry());

  return res.status(200).json({
    message: 'Login successful',
    access_token: accessToken,
    refresh_token: refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
};

exports.refresh = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(422).json({ message: 'Refresh token is required' });
  }

  const tokenRecord = await RefreshToken.findByToken(refresh_token);
  if (!tokenRecord) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }

  let payload;
  try {
    payload = jwt.verify(refresh_token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await User.findById(payload.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const accessToken = generateAccessToken(user);
  return res.status(200).json({ access_token: accessToken });
};

exports.logout = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(422).json({ message: 'Refresh token is required' });
  }

  await RefreshToken.revoke(refresh_token);
  return res.status(200).json({ message: 'Logged out successfully' });
};
