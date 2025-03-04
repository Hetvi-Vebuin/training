import { getUserDetailsUseCase } from "../../src/application/use_cases/user/getUserDetailsUseCase";
import { UserRepoPort } from "../../src/application/port/repositories/user/user_repo.port";
import { EntityManager } from "typeorm";

describe("getUserDetailsUseCase", () => {
  let mockUserRepo: jest.Mocked<UserRepoPort>;
  let mockTransaction: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      getDetails: jest.fn(),
      getUserById: jest.fn(),
    } as any;

    mockTransaction = {} as jest.Mocked<EntityManager>; // Mock EntityManager
  });

  it("should return all users if the requester is an admin and isAdmin is true", async () => {
    const mockUsers = [
      {
        id: 1,
        username: "testUser1",
        email: "email1@gmail.com",
        password: "password1",
        role: "user",
      },
      {
        id: 2,
        username: "testUser2",
        email: "email2@gmail.com",
        password: "password2",
        role: "user",
      },
    ];
    mockUserRepo.getDetails.mockResolvedValue(mockUsers);

    await expect(
      getUserDetailsUseCase(1, "admin", true, mockUserRepo, mockTransaction)
    ).resolves.toEqual(mockUsers);
    expect(mockUserRepo.getDetails).toHaveBeenCalledWith(mockTransaction);
  });

  it("should return user details if the requester is a user", async () => {
    const mockUser = {
      id: 2,
      username: "testUser",
      email: "email@gmail.com",
      password: "password",
      role: "user",
    };
    mockUserRepo.getUserById.mockResolvedValue(mockUser);

    await expect(
      getUserDetailsUseCase(2, "user", false, mockUserRepo, mockTransaction)
    ).resolves.toEqual(mockUser);
    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(2, mockTransaction);
  });

  it("should throw an error if the user does not exist", async () => {
    mockUserRepo.getUserById.mockResolvedValue(null);

    await expect(
      getUserDetailsUseCase(2, "user", false, mockUserRepo, mockTransaction)
    ).rejects.toThrow("User not found");
    expect(mockUserRepo.getUserById).toHaveBeenCalledWith(2, mockTransaction);
  });
});
