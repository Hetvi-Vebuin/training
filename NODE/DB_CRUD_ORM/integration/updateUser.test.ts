import request from "supertest";
import { AppDataSource } from "../src/infrastructure/helpers/orm/typeorm/config/ormconfig";
import express from "express";
import routes from "../src/interface/routes/userRoutes";
import { EntityManager } from "typeorm";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(routes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe("Update User Details", () => {
  let entityManager: EntityManager;
  let adminToken: string, userToken: string;
  let userIdValue: number, adminIdValue: number;

  async function createUsers() {
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

  it("should allow user to update their own account", async () => {
    await createUsers();
    const response = await request(app)
      .patch(`/me`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ id: userIdValue, username: "selfUpdatedUser" })
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Successfully updated user"
    );
  });

  it("should not allow admin to update another user's account", async () => {
    const response = await request(app)
      .patch(`/me`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ id: userIdValue, username: "hackerUpdate" })
      .expect(403);

    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should not allow user to update another user's account", async () => {
    const response = await request(app)
      .patch(`/me`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ id: 123, username: "hackerUpdate" })
      .expect(403);

    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should return 400 if email is already taken", async () => {
    const response = await request(app)
      .patch(`/me`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ id:adminIdValue, email: "user@example.com" })
      .expect(400);

    expect(response.body).toHaveProperty("error", "Email is already taken");
  });
});
