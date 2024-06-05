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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = exports.selectField = void 0;
const client_1 = require("@prisma/client");
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
const appError_error_1 = require("../../errorHanler/appError.error");
const http_status_1 = __importDefault(require("http-status"));
exports.selectField = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    role: true,
    status: true,
    profilePhoto: true,
};
const getUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const result = yield prisma_utlis_1.prisma.user.findMany({
        where: {
            email: {
                not: email,
            },
        },
        select: exports.selectField,
    });
    return result;
});
// get user profile by token id starts here
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is user is exists or not
    const result = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
        select: exports.selectField,
    });
    return result;
});
// get user profile by token id ends here
// update user profile
const setProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is user exists or not
    yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
            status: client_1.UserActiveStatus.ACTIVE,
        },
    });
    // update user profile information
    const result = yield prisma_utlis_1.prisma.user.update({
        where: {
            id,
        },
        data: payload,
        select: exports.selectField,
    });
    return result;
});
// update user profile
// admin set profile
const setStatus = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    // take user role from token
    const { role } = user;
    // check is user exists or not
    const userInfo = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: { id },
    });
    // prevent admin to block super admin or create a user super admin
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.UserRole.SUPER_ADMIN) {
        // admin can not create super admin
        if ((payload === null || payload === void 0 ? void 0 : payload.role) === client_1.UserRole.SUPER_ADMIN && role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not create super admin");
            // admin cannot block super admin
        }
        else if ((payload === null || payload === void 0 ? void 0 : payload.role) === client_1.UserRole.ADMIN && role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not create super admin");
            // admin cannot block super admin
        }
        else if ((payload === null || payload === void 0 ? void 0 : payload.role) === client_1.UserRole.BUDDY && role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not create super admin");
            // admin cannot block super admin
        }
        else if ((payload === null || payload === void 0 ? void 0 : payload.status) === client_1.UserActiveStatus.BLOCKED &&
            role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not blocked super admin");
        }
    }
    // prevent admin to make buddy a superadmin
    else if (userInfo.role === client_1.UserRole.BUDDY) {
        if (payload.role === client_1.UserRole.SUPER_ADMIN && role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not create super admin");
        }
    }
    // prevent admin to make a admin superadmin
    else if (userInfo.role === client_1.UserRole.ADMIN) {
        if (payload.role === client_1.UserRole.SUPER_ADMIN && role === client_1.UserRole.ADMIN) {
            throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Admin can not create super admin");
        }
    }
    // active user or block user edit roles operation
    const result = yield prisma_utlis_1.prisma.user.update({
        where: { id },
        // data: { role: payload.role, status: payload.status },
        data: payload,
        select: exports.selectField,
    });
    return result;
});
// admin set profile
exports.userServices = {
    getProfile,
    setProfile,
    setStatus,
    getUsers,
};
