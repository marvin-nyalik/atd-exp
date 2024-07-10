import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/helpers.mjs";
import { User } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  console.log("serializer");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializer");
  try {
    const user = mock_users.find((user) => user.id === id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
const passAuth = passport.use(
  new Strategy(async(username, password, done) => {
    try {
      const user = await User.findOne({username});
      if (!user) throw new Error("User not Found");
      if (!comparePassword(password, user.password)) throw new Error("Invalid credentials");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passAuth;
