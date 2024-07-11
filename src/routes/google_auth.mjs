import { Router } from "express";
import authenticator from "../strategies/googleStrategy.mjs";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get(
  "/google-auth",
  authenticator.authenticate("google", {
    access_type: "offline",
    scope: ["email", "profile"],
  }),
  (req, res) => {
    res.status(200).json({ msg: "Authenticated" });
  }
);

router.get("/auth/google", authenticator.authenticate("google"), (req, res) => {
  res.status(200).json({ msg: "Authenticated", user: req.user });
});

router.post("/google-logout", (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "You didn't log in" });
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ msg: "An error occurred" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(400)
          .json({ msg: "An error occurred while destroying the session" });
      }
      res.status(200).json({ msg: "Logged out successfully" });
    });
  });
});

export default router;
