import { Router } from "express";
import { mock_users } from "../utils/constants.mjs";
import { resolveUserMiddleware } from "../utils/middlewares.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { userValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

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

router.post("/api/users", checkSchema(userValidationSchema), (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });
  const newUser = { id: mock_users.length + 1, ...data };
  mock_users.push(newUser);
  res.status(201).json(newUser);
});

router.delete("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx } = req;
  mock_users.splice(userIdx, 1);
  res.status(200).json({ msg: "User deleted" });
});

export default router;
