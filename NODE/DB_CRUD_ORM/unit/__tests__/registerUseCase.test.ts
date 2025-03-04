import { AuthRepoPort } from "../../src/application/port/repositories/auth/auth_repo.port";
import { registerUseCase } from "../../src/application/use_cases/authUser/registerUseCase";
import { EntityManager } from "typeorm";
import { user } from "../../src/domain/models/user";

describe("registerUseCase", () => {
  let mockAuthRepo: jest.Mocked<AuthRepoPort>;
  let mockTransaction: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockAuthRepo = {
      getDetailByEmail: jest.fn(),
      registerDetail: jest.fn(),
    } as any;

    mockTransaction = {} as jest.Mocked<EntityManager>;
  });

  it("should register a new user if email is not taken", async () => {
    mockAuthRepo.getDetailByEmail.mockResolvedValue(null);

    await expect(
      registerUseCase(
        "test@example.com",
        "testUser",
        "securePassword",
        "user",
        mockAuthRepo,
        mockTransaction
      )
    ).resolves.not.toThrow();

    expect(mockAuthRepo.getDetailByEmail).toHaveBeenCalledWith(
      "test@example.com",
      mockTransaction
    );
    expect(mockAuthRepo.registerDetail).toHaveBeenCalledWith(
      "test@example.com",
      "testUser",
      "securePassword",
      "user",
      mockTransaction
    );
  });

  it("should throw an error if the email is already taken", async () => {
    const existingUser: user = {
      id: 1,
      email: "test@example.com",
      username: "testUser",
      password: "securePassword",
      role: "user",
    };
    mockAuthRepo.getDetailByEmail.mockResolvedValue(existingUser);

    await expect(
      registerUseCase(
        "test@example.com",
        "testUser",
        "securePassword",
        "user",
        mockAuthRepo,
        mockTransaction
      )
    ).rejects.toThrow("Email is already taken");

    expect(mockAuthRepo.getDetailByEmail).toHaveBeenCalledWith(
      "test@example.com",
      mockTransaction
    );
    expect(mockAuthRepo.registerDetail).not.toHaveBeenCalled();
  });
});
