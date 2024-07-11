import { Router } from "express";
import passpt from "../strategies/localStrategy.mjs";

const router = Router();

router.post("/real/auth", passpt.authenticate("local"), (req, res) => {
  res.status(200).json({ msg: "Authenticated", user: req.user });
});

router.post("/logout", (req, res) => {
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

router.get("/auth-status", (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({ msg: "You logged in" });
  } else {
    console.log("No authenticated user");
    res.status(400).json({ msg: "You didnt log in" });
  }
});

export default router;
