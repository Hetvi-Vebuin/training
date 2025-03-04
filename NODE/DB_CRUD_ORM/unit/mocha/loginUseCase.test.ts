import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import { loginUseCase } from "../../src/application/use_cases/authUser/loginUseCase";
import { AuthRepoPort } from "../../src/application/port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm";

describe("loginUseCase", () => {
    let authRepoMock: sinon.SinonStubbedInstance<AuthRepoPort>;
    let entityManagerMock: sinon.SinonStubbedInstance<EntityManager>;
    let jwtSignStub: sinon.SinonStub;

    beforeEach(() => {
        authRepoMock = {
            loginDetail: sinon.stub()
        } as unknown as sinon.SinonStubbedInstance<AuthRepoPort>;
        entityManagerMock = sinon.createStubInstance(EntityManager);
        jwtSignStub = sinon.stub(jwt, "sign");
    });

    afterEach(() => {
        jwtSignStub.restore();
    });

    it("should throw an error if user is not found", async () => {
        authRepoMock.loginDetail.resolves(null);
        
        try {
            await loginUseCase("test@example.com", "password123", authRepoMock, entityManagerMock);
            throw new Error("Test should have thrown an error but did not");
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect((error as Error).message).to.equal("User Not Found");
        }
    });

    it("should throw an error if the password is incorrect", async () => {
        authRepoMock.loginDetail.resolves({ id: 1, email: "test@example.com", username:"testCase", password: "correctPassword", role: "user" });
        
        try {
            await loginUseCase("test@example.com", "wrongPassword", authRepoMock, entityManagerMock);
            throw new Error("Test should have thrown an error but did not");
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect((error as Error).message).to.equal("Invalid password");
        }
    });

    it("should return a token if login is successful", async () => {
        authRepoMock.loginDetail.resolves({ id: 1, email: "test@example.com", username:"testCase", password: "password123", role: "user" });
        jwtSignStub.returns("mockedToken");

        const result = await loginUseCase("test@example.com", "password123", authRepoMock, entityManagerMock);
        expect(result).to.have.property("token", "mockedToken");
    });
});