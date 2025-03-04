import { expect } from "chai";
import sinon from "sinon";
import { EntityManager } from "typeorm";
import { updateUserUseCase } from "../../src/application/use_cases/user/updateUserUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { authRepo } from "../../src/infrastructure/reposiritories/auth.repo";
import { tokenType, updateType, user } from "../../src/domain/models/user";
import { AuthRepoPort } from "../../src/application/port/repositories/auth/auth_repo.port";

describe("updateUserUseCase", () => {
  let userRepoMock: sinon.SinonStubbedInstance<UserRepoPort>;
  let authRepoMock: sinon.SinonStubbedInstance<AuthRepoPort>; // Fix: Use correct type
  let entityManagerMock: sinon.SinonStubbedInstance<EntityManager>;

  beforeEach(() => {
    userRepoMock = {
      getDetails: sinon.stub(),
      getUserById: sinon.stub(),
      deleteUsers: sinon.stub(),
      updateUsers: sinon.stub(),
      wrapTransaction: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<UserRepoPort>;

    authRepoMock = {
      getDetailByEmail: sinon.stub(), // Stub getDetailByEmail method
      loginDetail: sinon.stub(),
      registerDetail: sinon.stub(),
      wrapTransaction: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<AuthRepoPort>;

    entityManagerMock = sinon.createStubInstance(EntityManager);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should allow user to update their own details", async () => {
    const tokenData: tokenType = { id: 3, role: "user" };
    const updateData: updateType = { id: 3, email: "usernew@example.com" };

    userRepoMock.getUserById.resolves({ id: 3 
      
    } as user);
    authRepoMock.getDetailByEmail.resolves(null); // No duplicate email
    userRepoMock.updateUsers.resolves();

    await updateUserUseCase(tokenData, updateData, userRepoMock, entityManagerMock);

    expect(userRepoMock.getUserById.calledOnceWith(3, entityManagerMock)).to.be.true;
    expect(authRepoMock.getDetailByEmail.calledOnceWith(updateData.email, entityManagerMock)).to.be.true;
    expect(userRepoMock.updateUsers.calledOnceWith(updateData, entityManagerMock)).to.be.true;
  
  });

  it("should throw an error if a user tries to update another user's details", async () => {
    const tokenData: tokenType = { id: 4, role: "user" };
    const updateData: updateType = { id: 5, email: "hacker@example.com" };

    try {
      await updateUserUseCase(
        tokenData,
        updateData,
        userRepoMock,
        entityManagerMock
      );
    } catch (error) {
      expect((error as Error).message).to.equal("Unauthorized");
    }
    expect(userRepoMock.getUserById.notCalled).to.be.true;
    expect(authRepoMock.getDetailByEmail.notCalled).to.be.true;
    expect(userRepoMock.updateUsers.notCalled).to.be.true;
  });

  it("should throw an error if user does not exist", async () => {
    const tokenData: tokenType = { id: 1, role: "admin" };
    const updateData: updateType = { id: 6, email: "notfound@example.com" };

    userRepoMock.getUserById.resolves(null);

    try {
      await updateUserUseCase(
        tokenData,
        updateData,
        userRepoMock,
        entityManagerMock
      );
    } catch (error) {
      expect((error as Error).message).to.equal("User not found");
    }
    expect(userRepoMock.getUserById.calledOnceWith(6, entityManagerMock)).to.be
      .true;
    expect(userRepoMock.updateUsers.notCalled).to.be.true;
  });

  it("should throw an error if the new email is already taken", async () => {
    const tokenData: tokenType = { id: 2, role: "admin" };
    const updateData: updateType = { id: 2, email: "existing@example.com" };

    userRepoMock.getUserById.resolves({ id: 2 } as user);
    authRepoMock.getDetailByEmail.resolves({ id: 7 } as user);

    try {
      await updateUserUseCase(
        tokenData,
        updateData,
        userRepoMock,
        entityManagerMock
      );
    } catch (error) {
      expect((error as Error).message).to.equal("Email is already taken");
    }
    expect(userRepoMock.getUserById.calledOnceWith(2, entityManagerMock)).to.be
      .true;
    expect(
      authRepoMock.getDetailByEmail.calledOnceWith(
        updateData.email,
        entityManagerMock
      )
    ).to.be.true;
    expect(userRepoMock.updateUsers.notCalled).to.be.true;
  });
});
