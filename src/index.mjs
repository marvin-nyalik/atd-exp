import express from "express";
import baseRouter from './routes/index.mjs';

const app = express();
app.use(express.json());
app.use(baseRouter);

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
