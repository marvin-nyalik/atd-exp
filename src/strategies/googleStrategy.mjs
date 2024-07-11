// GoogleStrategy.mjs
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { GoogleUser } from "../mongoose/schemas/googleUser.mjs";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: 'google' });
});

passport.deserializeUser(async (data, done) => {
  if (data.type === 'google') {
    try {
      const user = await GoogleUser.findById(data.id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  } else {
    done(new Error("Invalid user type"), null);
  }
});

const googleAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleID: profile.id });

        if (!user) {
          user = await GoogleUser.create({
            username: profile.displayName,
            googleID: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default googleAuth;
