import express from "express";
import { body, checkSchema, validationResult, matchedData } from "express-validator";
import { userValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3100;
const mock_users = [
  { id: 1, username: "Marv", name: "Marvin" },
  { id: 2, username: "Aleagy", name: "Aleagy" },
  { id: 3, username: "Jane", name: "Jenito" },
  { id: 4, username: "Lilian", name: "Mutinda" },
  { id: 5, username: "Jacob", name: "Okoth" },
  { id: 6, username: "Jazmine", name: "Mutiso" },
  { id: 7, username: "Cecile", name: "Aketch" },
  { id: 8, username: "Anthony", name: "Ochieng" },
];

const resolveUserMiddleware = (req, res, next) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const userIdx = mock_users.findIndex((user) => user.id === parsedId);
  if (userIdx === -1) return res.sendStatus(404);
  req.userIdx = userIdx;
  next();
};

app.get("/api/users", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) {
    const usersF = mock_users.filter((user) => user[filter].includes(value));
    return res.status(200).json(usersF);
  }
  return res.status(200).json(mock_users);
});

app.get("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx } = req;
  const foundUser = mock_users[userIdx];
  if (!foundUser) res.status(404).send("Invalid user id");

  return res.send(foundUser);
});

app.put("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { body, userIdx } = req;
  mock_users[userIdx] = { id: mock_users[userIdx].id, ...body };
  res.status(204).json(mock_users[userIdx]);
});

app.patch("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx, body } = req;
  mock_users[userIdx] = { ...mock_users[userIdx], ...body };
  res.status(200).json(mock_users[userIdx]);
});

app.post(
  "/api/users",
  checkSchema(userValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });
    const newUser = { id: mock_users.length + 1, ...data };
    mock_users.push(newUser);
    res.status(201).json(newUser);
  }
);

app.delete("/api/users/:id", resolveUserMiddleware, (req, res) => {
  const { userIdx } = req;
  mock_users.splice(userIdx, 1);
  res.status(200).json({ msg: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
