import jwt from "jsonwebtoken";
import { loginUseCase } from "../../src/application/use_cases/authUser/loginUseCase";
import { AuthRepoPort } from "../../src/application/port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm";
import { user } from "../../src/domain/models/user";

jest.mock("jsonwebtoken");

describe("loginUseCase", () => {
  let mockAuthRepo: jest.Mocked<AuthRepoPort>;
  let mockTransaction: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockAuthRepo = {
      loginDetail: jest.fn(),
    } as any;

    mockTransaction = {} as jest.Mocked<EntityManager>; // Mock EntityManager
  });

  it("should return a token for valid credentials", async () => {
    const mockUser: user = {
      id: 1,
      email: "test@example.com",
      username: "testUser",
      password: "securePassword",
      role: "user",
    };
    mockAuthRepo.loginDetail.mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue("mocked_token");

    const result = await loginUseCase(
      "test@example.com",
      "securePassword",
      mockAuthRepo,
      mockTransaction
    );

    expect(result).toEqual({ token: "mocked_token" });
    expect(mockAuthRepo.loginDetail).toHaveBeenCalledWith(
      "test@example.com",
      mockTransaction
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id, role: mockUser.role },
      process.env.JWT_SECRET ?? "EMP0375",
      { expiresIn: "1h" }
    );
  });

  it("should throw an error if the user is not found", async () => {
    mockAuthRepo.loginDetail.mockResolvedValue(null);

    await expect(
      loginUseCase(
        "test@example.com",
        "securePassword",
        mockAuthRepo,
        mockTransaction
      )
    ).rejects.toThrow("User Not Found");

    expect(mockAuthRepo.loginDetail).toHaveBeenCalledWith(
      "test@example.com",
      mockTransaction
    );
  });

  it("should throw an error for an invalid password", async () => {
    const mockUser: user = {
      id: 1,
      email: "test@example.com",
      username: "testUser",
      password: "correctPassword",
      role: "user",
    };
    mockAuthRepo.loginDetail.mockResolvedValue(mockUser);

    await expect(
      loginUseCase(
        "test@example.com",
        "wrongPassword",
        mockAuthRepo,
        mockTransaction
      )
    ).rejects.toThrow("Invalid password");

    expect(mockAuthRepo.loginDetail).toHaveBeenCalledWith(
      "test@example.com",
      mockTransaction
    );
  });
});
