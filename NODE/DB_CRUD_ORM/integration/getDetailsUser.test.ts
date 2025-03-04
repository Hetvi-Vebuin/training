import request from "supertest";
import { AppDataSource } from "../src/infrastructure/helpers/orm/typeorm/config/ormconfig";
import express from "express";
import routes from "../src/interface/routes/userRoutes";
import { EntityManager } from "typeorm";
import jwt from "jsonwebtoken";
import { afterEach } from "node:test";

const app = express();
app.use(express.json());
app.use(routes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe("Get User Details based on isAdmin query and role", () => {
  let entityManager: EntityManager;
  let adminToken: string, userToken: string;
  let userIdValue: number, adminIdValue: number;

  async function createUsers() {
    await entityManager.query('delete from user;')
    await entityManager.query(
      "insert into user(username, email, password, role) values('adminUser','admin@example.com','adminPassword','admin');"
    );
    await entityManager.query(
      "insert into user(username, email, password, role) values('normalUser','user@example.com','userPassword','user');"
    );

    const userId = await entityManager.query(
      "select id from user where username='normalUser';"
    );
    const adminId = await entityManager.query(
      "select id from user where username='adminUser';"
    );
    userIdValue = userId[0]?.id;
    adminIdValue = adminId[0]?.id;
    // Generate JWT tokens
    adminToken = jwt.sign(
      { id: adminIdValue, role: "admin" },
      process.env.JWT_SECRET ?? "EMP0375",
      { expiresIn: "1h" }
    );

    userToken = jwt.sign(
      { id: userIdValue, role: "user" },
      process.env.JWT_SECRET ?? "EMP0375",
      { expiresIn: "1h" }
    );
  }

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
  });

  afterAll(async () => {
    await entityManager.query("delete from user;");
  });

  it("should return all users if the requester is an admin and isAdmin is true", async () => {
    await createUsers();

    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ isAdmin: true })
      .expect(200);

    expect(response.body).toHaveProperty("userData");
    expect(response.body.userData).toHaveLength(2);
    expect(response.body.userData[0]).toHaveProperty("email");
  });

  it("should return user details if the requester is a user", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("userData");
    expect(response.body.userData).toHaveProperty("email");
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/me").expect(401);

    expect(response.body).toHaveProperty("error", "Access denied");
  });

  it("should return 401 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", "Bearer 1")
      .expect(403);

    expect(response.body).toHaveProperty("error", "Invalid token");
  });
});
