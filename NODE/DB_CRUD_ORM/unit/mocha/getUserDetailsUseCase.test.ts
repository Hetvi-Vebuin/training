import { expect } from "chai";
import sinon from "sinon";
import { getUserDetailsUseCase } from "../../src/application/use_cases/user/getUserDetailsUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { EntityManager } from "typeorm";
import { user } from "../../src/domain/models/user";

describe("getUserDetailsUseCase", () => {
  let userRepoMock: sinon.SinonStubbedInstance<UserRepoPort>;
  let entityManagerMock: sinon.SinonStubbedInstance<EntityManager>;

  beforeEach(() => {
    userRepoMock = {
      getDetails: sinon.stub(),
      getUserById: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<UserRepoPort>;
    entityManagerMock = sinon.createStubInstance(EntityManager);
  });

  it("should return all user details if the requester is an admin", async () => {
    userRepoMock.getDetails.resolves([
      {
        id: 1,
        email: "admin@example.com",
        username: "testCase",
        password: "testPassword",
        role: "admin",
      },
    ]);

    const result = await getUserDetailsUseCase(
      1,
      "admin",
      true,
      userRepoMock,
      entityManagerMock
    );
    expect(result).to.be.an("array");
    if (Array.isArray(result)) {
        expect(result[0]).to.have.property('email', 'admin@example.com');
    }  });

  it("should return the user details if the requester is a user", async () => {
    userRepoMock.getUserById.resolves({
      id: 2,
      email: "user@example.com",
      username: "testCase",
        password: "testPassword",
      role: "user",
    });

    const result = await getUserDetailsUseCase(
      2,
      "user",
      false,
      userRepoMock,
      entityManagerMock
    );
    expect(result).to.have.property("email", "user@example.com");
  });

  it("should throw an error if the user is not found", async () => {
    userRepoMock.getUserById.resolves(null);

    try {
      await getUserDetailsUseCase(
        3,
        "user",
        false,
        userRepoMock,
        entityManagerMock
      );
      throw new Error("Test should have thrown an error but did not");
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal("User not found");
    }
  });

  it("should return undefined if isAdmin is false and role is not user", async () => {
    const result = await getUserDetailsUseCase(
      4,
      "guest",
      false,
      userRepoMock,
      entityManagerMock
    );
    expect(result).to.be.undefined;
  });
});
