import mongoose from "mongoose";
import { User } from "../mongoose/schemas/user.mjs";
import request from "supertest";
import connectDB from "../../db.mjs";
import createApp from "../../createExpressApp.mjs";

const user = {
  username: "JenitoTechie",
  password: "Jenito1234",
  email: "jane@test.com",
};

const invalid_user = {
  password: "Jenito1234",
  email: "jane@test.com",
};

describe("User Registration", () => {
  let app;
  beforeAll(async () => {
    connectDB(process.env.MONGODB_TEST_URI)
      .then(() => {
        console.log(`Connected to test mongo db`);
      })
      .catch((err) => console.log(err));

    app = createApp();

    app.listen(3100, () => {
      console.log(`Testing on port 3100`);
    });
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("Should register a User with valid data", async () => {
    const res = await request(app).post("/api/users").send(user);
    expect(res.status).toBe(201);
  });

  it("Should not register an invalid User", async () => {
    const res = await request(app).post("/api/users").send(invalid_user);
    expect(res.status).toBe(400);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
