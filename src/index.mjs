import express from "express";
import baseRouter from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import connectDB from "../db.mjs";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// connecting app to database
connectDB(process.env.MONGODB_URI).then(() => {
  console.log(`Connected to mongo db`);
}).catch(err => console.log(err));

//register session, json, cookieParser middleware
app.use(express.json());
app.use(cookieParser("ubungen"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "sessions-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60000 * 10,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// use base router
app.use(baseRouter);

const PORT = process.env.PORT || 3100;

// CREATING A COOKIE EXAMPLE
app.get("/", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("greeting", "guten mogen", {
    maxAge: 60000,
    signed: true,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });
  res.status(200).json({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});

export default app;
