const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const avatar_url = profile.photos[0]?.value || null;

      let user = await User.findByEmail(email);

      if (user) {
        await User.updateOAuth(user.id, { oauth_provider: 'google', avatar_url });
        user.oauth_provider = 'google';
        user.avatar_url = avatar_url;
      } else {
        user = await User.create({
          name,
          email,
          password: null,
          role: 'tenant',
          oauth_provider: 'google',
          avatar_url,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id }));
