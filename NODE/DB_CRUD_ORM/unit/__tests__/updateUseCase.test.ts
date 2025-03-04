import { updateUserUseCase } from "../../src/application/use_cases/user/updateUserUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { EntityManager } from "typeorm";
import { authRepo } from "../../src/infrastructure/reposiritories/auth.repo";
import { tokenType, updateType, user } from "../../src/domain/models/user";

jest.mock("../../src/infrastructure/reposiritories/auth.repo");

describe("updateUserUseCase", () => {
  let mockUserRepo: jest.Mocked<UserRepoPort>;
  let mockTransaction: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      getUserById: jest.fn(),
      updateUsers: jest.fn(),
    } as any;

    mockTransaction = {} as jest.Mocked<EntityManager>;
  });

  it("should update user if admin or user updating their own data", async () => {
    const tokenData: tokenType = { id: 1, role: "admin" };
    const updateData: updateType = { id: 2, email: "new@example.com", username: "newUser" };
    const existingUser: user = { id: 2, email: "old@example.com", username: "oldUser", password: "password", role: "user" };

    mockUserRepo.getUserById.mockResolvedValue(existingUser);
    (authRepo.getDetailByEmail as jest.Mock).mockResolvedValue(null);
    mockUserRepo.updateUsers.mockResolvedValue(undefined);

    await expect(updateUserUseCase(tokenData, updateData, mockUserRepo, mockTransaction)).resolves.not.toThrow();

    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(updateData.id, mockTransaction);
    expect(authRepo.getDetailByEmail).toHaveBeenCalledWith(updateData.email, mockTransaction);
    expect(mockUserRepo.updateUsers).toHaveBeenCalledWith(updateData, mockTransaction);
  });

  it("should throw an error if user is unauthorized", async () => {
    const tokenData: tokenType = { id: 1, role: "user" };
    const updateData: updateType = { id: 2, email: "new@example.com", username: "newUser" };

    await expect(updateUserUseCase(tokenData, updateData, mockUserRepo, mockTransaction)).rejects.toThrow("Unauthorized");

    expect(mockUserRepo.getUserById).not.toHaveBeenCalled();
    expect(mockUserRepo.updateUsers).not.toHaveBeenCalled();
  });

  it("should throw an error if user does not exist", async () => {
    const tokenData: tokenType = { id: 1, role: "admin" };
    const updateData: updateType = { id: 2, email: "new@example.com", username: "newUser" };

    mockUserRepo.getUserById.mockResolvedValue(null);

    await expect(updateUserUseCase(tokenData, updateData, mockUserRepo, mockTransaction)).rejects.toThrow("User not found");

    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(updateData.id, mockTransaction);
    expect(mockUserRepo.updateUsers).not.toHaveBeenCalled();
  });

  it("should throw an error if email is already taken by another user", async () => {
    const tokenData: tokenType = { id: 1, role: "admin" };
    const updateData: updateType = { id: 2, email: "taken@example.com", username: "newUser" };
    const existingUser: user = { id: 2, email: "old@example.com", username: "oldUser", password: "password", role: "user" };
    const anotherUser: user = { id: 3, email: "taken@example.com", username: "anotherUser", password: "password", role: "user" };

    mockUserRepo.getUserById.mockResolvedValue(existingUser);
    (authRepo.getDetailByEmail as jest.Mock).mockResolvedValue(anotherUser);

    await expect(updateUserUseCase(tokenData, updateData, mockUserRepo, mockTransaction)).rejects.toThrow("Email is already taken");

    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(updateData.id, mockTransaction);
    expect(authRepo.getDetailByEmail).toHaveBeenCalledWith(updateData.email, mockTransaction);
    expect(mockUserRepo.updateUsers).not.toHaveBeenCalled();
  });
});
