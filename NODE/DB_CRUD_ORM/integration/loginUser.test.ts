import request from "supertest";
import { AppDataSource } from "../src/infrastructure/helpers/orm/typeorm/config/ormconfig";
import express from "express";
import routes from "../src/interface/routes/authRoutes";
import { EntityManager } from "typeorm";

const app = express();
app.use(express.json());
app.use(routes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe("login - User Authentication", () => {
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
    // Insert a test user
    await entityManager.query(
      "INSERT INTO user (username, email, password, role) VALUES ('testUser', 'test@example.com', 'securePassword', 'user');"
    );
  });

  afterEach(async () => {
    await entityManager.query("delete from user;");
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "securePassword",
      })
      .expect(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("data.token");
  });

  it("should return 404 if the user does not exist", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "notfound@example.com",
        password: "securePassword",
      })
      .expect(404);

    expect(response.body).toEqual({ message: "User Not Found" });
  });

  it("should return 400 if the password is incorrect", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "wrongPassword",
      })
      .expect(401);

    expect(response.body).toEqual({ message: "Invalid password" });
  });

  //   it("should return 500 if there is a server error", async () => {
  //     // Simulate a server error by making `loginDetail` throw an error

  //     const response = await request(app)
  //       .post("/login")
  //       .send({
  //         email: "test@example.com",
  //         password: "securePassword",
  //       })
  //       .expect(500);

  //     expect(response.body).toEqual({ message: "Internal Server Error" });
  //   });
});
