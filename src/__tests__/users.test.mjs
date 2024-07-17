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

const user_to_auth = {
  username: "JenitoTechie",
  password: "Jenito1234",
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
    console.log(`--------------------------------------------------`);
  });

  it("Should register a User with valid data", async () => {
    const res = await request(app).post("/api/users").send(user);
    expect(res.status).toBe(201);
  });

  it("Should not register an invalid User", async () => {
    const res = await request(app).post("/api/users").send(invalid_user);
    expect(res.status).toBe(400);
  });

  it("Should login a valid user", async () => {
    const res = await request(app).post("/real/auth").send(user_to_auth);
    expect(res.status).toBe(200);

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    const connectSidCookie = cookies.find((cookie) =>
      cookie.startsWith("connect.sid=")
    );
    expect(connectSidCookie).toBeDefined();
  });

  it("Should allow user to visit protected routes", async () => {
    const res = await request(app)
      .post("/real/auth")
      .send(user_to_auth)
      .then((res) => {
        return request(app)
          .get("/auth-status")
          .set("Cookie", res.headers["set-cookie"]);
      });
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
