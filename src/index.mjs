import express from "express";
import baseRouter from './routes/index.mjs';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser('ubungen'));
app.use(baseRouter);

const PORT = process.env.PORT || 3100;

app.get('/', (req, res) => {
  res.cookie('greeting', 'guten mogen', { maxAge: 60000, signed: true });
  res.status(200).json({ msg: 'Hello World'});
})

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
