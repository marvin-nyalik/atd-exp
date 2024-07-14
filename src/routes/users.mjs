import { Router } from "express";
import { mock_users } from "../utils/constants.mjs";
import { resolveUserMiddleware } from "../utils/middlewares.mjs";
import { validationResult, matchedData } from "express-validator";
import { userValidationSchema } from "../utils/validationSchemas.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const router = Router();

router.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = mock_users.find((user) => user.username === username);
  if (!user || user.password !== password)
    return res.status(400).json({ msg: "Wrong credentials" });
  req.session.user = user;
  req.sessionStore.get(req.sessionID, (err, data) => {
    console.log(req.sessionID);
  });
  res.status(200).json({ user: user });
});

router.get("/api/users", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) {
    const usersF = mock_users.filter((user) => user[filter].includes(value));
    return res.status(200).json(usersF);
  }
  return res.status(200).json(mock_users);
});

router.get("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx } = req;
  const foundUser = mock_users[userIdx];
  if (!foundUser) res.status(404).send("Invalid user id");

  return res.send(foundUser);
});

router.put("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { body, userIdx } = req;
  mock_users[userIdx] = { id: mock_users[userIdx].id, ...body };
  res.status(204).json(mock_users[userIdx]);
});

router.patch("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx, body } = req;
  mock_users[userIdx] = { ...mock_users[userIdx], ...body };
  res.status(200).json(mock_users[userIdx]);
});

router.post(
  "/api/users",
  userValidationSchema,
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });
    try {
      data.password = hashPassword(data.password);
      const newUser = new User(data);
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

router.delete("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx } = req;
  mock_users.splice(userIdx, 1);
  res.status(200).json({ msg: "User deleted" });
});

export default router;
