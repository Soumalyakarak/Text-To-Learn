import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if user registered with email before
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link Google ID to existing email account
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a new Google user
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              // Random password placeholder for OAuth users
              password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
            });
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;