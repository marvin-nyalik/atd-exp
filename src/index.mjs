import connectDB from "../db.mjs";
import createApp from "../createExpressApp.mjs";
import dotenv from 'dotenv';

dotenv.config();

// connecting app to database
connectDB(process.env.MONGODB_URI).then(() => {
  console.log(`Connected to mongo db`);
}).catch(err => console.log(err));

const PORT = process.env.PORT || 3100;
const app = createApp();

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
