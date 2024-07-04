import passport from "passport";
import { Strategy } from "passport-local";
import { mock_users } from "../utils/constants.mjs";

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
  new Strategy((username, password, done) => {
    console.log(`username: ${username}, password: ${password}`);
    try {
      const user = mock_users.find((user) => user.username === username);
      if (!user) throw new Error("User not Found");
      if (user.password !== password) throw new Error("Invalid credentials");

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passAuth;
