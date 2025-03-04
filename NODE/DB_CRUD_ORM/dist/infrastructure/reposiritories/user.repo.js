"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const transaction_1 = require("../helpers/middleware/transaction");
const user_1 = require("../helpers/orm/typeorm/entities/user");
exports.userRepo = {
    wrapTransaction: transaction_1.wrapTransaction,
    getDetails: (entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield entityManager
            .createQueryBuilder()
            .select([
            "user.id",
            "user.username",
            "user.email",
            "user.role",
            "user.password",
        ])
            .from(user_1.User, "user")
            .getMany();
        return data;
    }),
    getUserById: (id, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield entityManager
            .createQueryBuilder()
            .select([
            "user.id",
            "user.username",
            "user.email",
            "user.role",
            "user.password",
        ])
            .from(user_1.User, "user")
            .where("user.id = :id", { id })
            .getOne();
        return data;
    }),
    deleteUsers: (id, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        yield entityManager
            .createQueryBuilder()
            .delete()
            .from(user_1.User, "user")
            .where("user.id = :id", { id })
            .execute();
    }),
    updateUsers: (updateData, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        yield entityManager
            .createQueryBuilder()
            .update(user_1.User)
            .set(updateData)
            .where("id = :id", { id: updateData.id })
            .execute();
    }),
};
