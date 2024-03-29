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
exports.userServices = void 0;
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
const selectField = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
};
// get user profile by token id starts here
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    // check is user is exists or not
    const result = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
        select: selectField,
    });
    return result;
});
// get user profile by token id ends here
// update user profile
const setProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_utlis_1.prisma.user.update({
        where: {
            id,
        },
        data: payload,
        select: selectField,
    });
    return result;
});
exports.userServices = {
    getProfile,
    setProfile,
};
