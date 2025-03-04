import request from "supertest";
import { AppDataSource } from "../src/infrastructure/helpers/orm/typeorm/config/ormconfig";
import express from "express";
import routes from "../src/interface/routes/authRoutes";
import { EntityManager } from "typeorm";

const app = express();
app.use(express.json()); // Ensure JSON parsing middleware is added
app.use(routes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe("register (with Transaction)", () => {
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
    await entityManager.query(
      "insert into user(username, email, password, role) values('testUser','test@gmail.com','testUser','user');"
    );
  });

  afterEach(async () => {
    await AppDataSource.query("delete from user;");
  });

  it("should register a new user inside a transaction", async () => {
    const newUser = {
      username: "het",
      email: "het@example.com",
      password: "password123!",
      role: "user",
    };

    const response = await request(app)
      .post("/register")
      .send(newUser)
      .expect(201);

    expect(response.body).toEqual({
      message: "User registered successfully",
    });
  });

  it("should register a new user if email is taken", async () => {
    const olduser = {
      username: "het",
      email: "test@gmail.com",
      password: "password123!",
      role: "user",
    };
    const response = await request(app)
      .post("/register")
      .send(olduser)
      .expect(409);

    expect(response.body).toEqual({
      message: "Email is already taken",
    });
  });
});
