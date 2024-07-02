import express from "express";

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3100;
const mock_users = [
  { id: 1, username: "Marv", name: "Marvin" },
  { id: 2, username: "Aleagy", name: "Aleagy" },
];

app.get("/api/users", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) {
    const usersF = mock_users.filter((user) => user[filter].includes(value));
    return res.status(200).json(usersF);
  }
  return res.status(200).json(mock_users);
});

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request" });

  const foundUser = mock_users.find((user) => user.id === parsedId);
  if (!foundUser) res.status(404).send('Invalid user id');

  return res.send(foundUser);
});

app.put("/api/users/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    const body = req.body
  
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const userIdx = mock_users.findIndex((user) => user.id === parsedId);
    if (userIdx === -1) return res.sendStatus(404);
    mock_users[userIdx] = { id: parsedId, ...body }
    res.status(204).json(mock_users[userIdx]);
  });

  app.patch("/api/users/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    const body = req.body
  
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const userIdx = mock_users.findIndex((user) => user.id === parsedId);
    if (userIdx === -1) return res.sendStatus(404);
    mock_users[userIdx] = { ...mock_users[userIdx], ...body }
    res.status(200).json(mock_users[userIdx]);
  });

app.post('/api/users', (req, res) => {
  const newUser = { id: mock_users.length + 1, ...req.body }
  mock_users.push(newUser);
  res.status(201).json(newUser);
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return res.sendStatus(400)
const userIndex = mock_users.findIndex((user) => user.id === parsedId)
if (userIndex === -1) return res.sendStatus(404);
mock_users.splice(userIndex, 1)
res.status(200).json({ msg: 'User deleted'})
})

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
