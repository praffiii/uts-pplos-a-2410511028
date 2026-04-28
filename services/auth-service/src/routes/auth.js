const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/profile', authMiddleware, authController.profile);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login-failed' }),
  authController.googleCallback
);
router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'Google OAuth login failed' });
});

module.exports = router;
