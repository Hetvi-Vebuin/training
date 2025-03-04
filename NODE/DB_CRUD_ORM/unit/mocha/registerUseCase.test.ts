import { expect } from 'chai';
import sinon from 'sinon';
import { registerUseCase } from "../../src/application/use_cases/authUser/registerUseCase";
import { AuthRepoPort } from "../../src/application/port/repositories/auth/auth_repo.port";
import { EntityManager } from 'typeorm';

describe('registerUseCase', () => {

    let authRepoMock: sinon.SinonStubbedInstance<AuthRepoPort>;
    let entityManagerMock: sinon.SinonStubbedInstance<EntityManager>;


    beforeEach(() => {
        entityManagerMock = sinon.createStubInstance(EntityManager);
        authRepoMock = {
            getDetailByEmail: sinon.stub(),
            registerDetail: sinon.stub(),
            loginDetail: sinon.stub(),
            wrapTransaction: sinon.stub(),
        } as unknown as sinon.SinonStubbedInstance<AuthRepoPort>;
    });

    it('should throw an error if the email is already taken', async () => {
        authRepoMock.getDetailByEmail.resolves({ id:1, username:"test", password:"password", email: 'test@example.com', role:"user" });
        
        try {
            await registerUseCase('test@example.com', 'testuser', 'password123', 'user', authRepoMock, entityManagerMock);
        } catch (error) {
            expect(error).to.be.an('error');
            expect((error as Error).message).to.equal('Email is already taken');
        }
    });

    it('should register a new user if email is not taken', async () => {
        authRepoMock.getDetailByEmail.resolves(null);
        authRepoMock.registerDetail.resolves();

        await registerUseCase('new@example.com', 'newuser', 'password123', 'user', authRepoMock, entityManagerMock);
        
        expect(authRepoMock.registerDetail.calledOnce).to.be.true;
        expect(authRepoMock.registerDetail.calledWith('new@example.com', 'newuser', 'password123', 'user', entityManagerMock)).to.be.true;
    });
});
