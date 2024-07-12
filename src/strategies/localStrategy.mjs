import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "../utils/helpers.mjs";
import { User } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: 'local' });
  console.log(`Local serialize: ${user}`)
});

passport.deserializeUser(async (data, done) => {
  console.log(`Local Des: ${data}`)
  if (data.type === 'local') {
    try {
      const user = await User.findById(data.id);
      if (!user) throw new Error("User not found");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  } else {
    done(new Error("Invalid user type"), null);
  }
});

const localAuth = passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");
      if (!comparePassword(password, user.password)) throw new Error("Invalid credentials");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

export default localAuth;
