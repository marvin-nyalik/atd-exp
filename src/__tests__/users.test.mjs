import mongoose from "mongoose";
import { User } from "../mongoose/schemas/user.mjs";
import app from "../index.mjs";
import request from "supertest";
import connectDB from "../../db.mjs";

const user = {
  username: "JenitoTechie",
  password: "Jenito1234",
  email: "jane@test.com",
};

// beforeAll(async () => {
//   await connectDB(`mongodb://127.0.0.1:27017/express-test-adt`).then(() => {
//     console.log(`Connected for test`);
//   });
// });

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User Registration", () => {
  it("Should register a User with valid data", async () => {
    const res = await request(app).post("/api/users").send(user);
    expect(res.status).toBe(201);
  });
});
