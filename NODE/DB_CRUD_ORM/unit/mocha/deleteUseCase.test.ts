import { expect } from "chai";
import sinon from "sinon";
import { EntityManager } from "typeorm";
import { deleteUserUseCase } from "../../src/application/use_cases/user/deleteUserUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { tokenType, user } from "../../src/domain/models/user";

describe("deleteUserUseCase", () => {
  let userRepoMock: sinon.SinonStubbedInstance<UserRepoPort>;
  let entityManagerMock: sinon.SinonStubbedInstance<EntityManager>;

  beforeEach(() => {
    userRepoMock = {
      getDetails: sinon.stub(),
      getUserById: sinon.stub(),
      deleteUsers: sinon.stub(),
      updateUsers: sinon.stub(),
      wrapTransaction: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<UserRepoPort>;

    entityManagerMock = sinon.createStubInstance(EntityManager);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should delete the user successfully when admin requests", async () => {
    const tokenData: tokenType = { id: 2, role: "admin" };
    const userIdToDelete = 1;

    userRepoMock.getUserById.resolves({ id: userIdToDelete } as user);
    userRepoMock.deleteUsers.resolves();

    await deleteUserUseCase(userIdToDelete, tokenData, userRepoMock, entityManagerMock);

    expect(userRepoMock.getUserById.calledOnceWith(userIdToDelete, entityManagerMock)).to.be.true;
    expect(userRepoMock.deleteUsers.calledOnceWith(userIdToDelete, entityManagerMock)).to.be.true;
  });

  it("should delete the user successfully when user deletes their own account", async () => {
    const tokenData: tokenType = { id: 3, role: "user" };
    const userIdToDelete = 3;

    userRepoMock.getUserById.resolves({ id: userIdToDelete } as user);
    userRepoMock.deleteUsers.resolves();

    await deleteUserUseCase(userIdToDelete, tokenData, userRepoMock, entityManagerMock);

    expect(userRepoMock.getUserById.calledOnceWith(userIdToDelete, entityManagerMock)).to.be.true;
    expect(userRepoMock.deleteUsers.calledOnceWith(userIdToDelete, entityManagerMock)).to.be.true;
  });

  it("should throw an error if a non-admin user tries to delete another user", async () => {
    const tokenData: tokenType = { id: 3, role: "user" };
    const userIdToDelete = 2;

    try {
      await deleteUserUseCase(userIdToDelete, tokenData, userRepoMock, entityManagerMock);
    } catch (error) {
      expect((error as Error).message).to.equal("Unauthorized");
    }
    expect(userRepoMock.getUserById.notCalled).to.be.true;
    expect(userRepoMock.deleteUsers.notCalled).to.be.true;
  });

  it("should throw an error if user does not exist", async () => {
    const tokenData: tokenType = { id: 2, role: "admin" };
    const userIdToDelete = 10;

    userRepoMock.getUserById.resolves(null);

    try {
      await deleteUserUseCase(userIdToDelete, tokenData, userRepoMock, entityManagerMock);
    } catch (error) {
      expect((error as Error).message).to.equal("User not found");
    }
    expect(userRepoMock.getUserById.calledOnceWith(userIdToDelete, entityManagerMock)).to.be.true;
    expect(userRepoMock.deleteUsers.notCalled).to.be.true;
  });
});
