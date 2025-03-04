import { deleteUserUseCase } from "../../src/application/use_cases/user/deleteUserUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { EntityManager } from "typeorm";

describe("deleteUserUseCase", () => {
  let mockUserRepo: jest.Mocked<UserRepoPort>;
  let mockTransaction: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      getUserById: jest.fn(),
      deleteUsers: jest.fn(),
    } as any;

    mockTransaction = {} as any;
  });

  it("should delete a user if the requester is an admin", async () => {
    const tokenData = { id: 1, role: "admin" };
    mockUserRepo.getUserById.mockResolvedValue({
      id: 2,
      username: "testUser",
      email: "email@gmail.com",
      password: "password",
      role: "user",
    });

    await expect(
      deleteUserUseCase(2, tokenData, mockUserRepo, mockTransaction)
    ).resolves.toBeUndefined();
    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(2, mockTransaction);
    expect(mockUserRepo.deleteUsers).toHaveBeenCalledWith(2, mockTransaction);
  });

  it("should delete the user if the requester is deleting their own account", async () => {
    const tokenData = { id: 2, role: "user" };
    mockUserRepo.getUserById.mockResolvedValue({
      id: 2,
      username: "testUser",
      email: "email@gmail.com",
      password: "password",
      role: "user",
    });

    await expect(
      deleteUserUseCase(2, tokenData, mockUserRepo, mockTransaction)
    ).resolves.toBeUndefined();
    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(2, mockTransaction);
    expect(mockUserRepo.deleteUsers).toHaveBeenCalledWith(2, mockTransaction);
  });

  it("should throw an error if the requester is unauthorized", async () => {
    const tokenData = { id: 3, role: "user" };
    await expect(
      deleteUserUseCase(2, tokenData, mockUserRepo, mockTransaction)
    ).rejects.toThrow("Unauthorized");
    expect(mockUserRepo.getUserById).not.toHaveBeenCalled();
    expect(mockUserRepo.deleteUsers).not.toHaveBeenCalled();
  });

  it("should throw an error if the user does not exist", async () => {
    const tokenData = { id: 1, role: "admin" };
    mockUserRepo.getUserById.mockResolvedValue(null);

    await expect(
      deleteUserUseCase(2, tokenData, mockUserRepo, mockTransaction)
    ).rejects.toThrow("User not found");
    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(2, mockTransaction);
    expect(mockUserRepo.deleteUsers).not.toHaveBeenCalled();
  });
});
