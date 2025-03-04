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

describe("Delete User Details based on isAdmin query and role", () => {
  let entityManager: EntityManager;
  let adminToken: string, userToken: string;
  let userIdValue: number, adminIdValue: number;

  async function createUsers() {
    await entityManager.query('delete from user;');
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

  it("should allow user to delete their own account", async () => {
    await createUsers();
    const response = await request(app)
      .delete(`/delete/${userIdValue}`)
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("message", "Successfully deleted");
  });

  it("should return 409 if the user does not exist", async () => {
    const invalidUserId = 99999;

    const response = await request(app)
      .delete(`/delete/${invalidUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(409);

    expect(response.body).toHaveProperty("error", "User does not exist");
  });

  it("should return 403 if a user tries to delete another user", async () => {
    const response = await request(app)
      .delete(`/delete/123`)
      .set("Authorization", `Bearer ${userToken}`)
      .expect(403);

    expect(response.body).toHaveProperty(
      "error",
      "You are not authorized to delete this user"
    );
  });
});
