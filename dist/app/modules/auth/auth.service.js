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
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const appError_error_1 = require("../../errorHanler/appError.error");
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
const user_service_1 = require("../user/user.service");
// create user starts here
const addUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = client_1.UserRole.BUDDY;
    // generate salt rounds
    const saltRounds = yield bcrypt_1.default.genSalt(Number(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.salt));
    // hash password
    payload.password = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.password, saltRounds);
    const { id, name, email, role, createdAt, profilePhoto, status, updatedAt } = yield prisma_utlis_1.prisma.user.create({
        data: payload,
        select: user_service_1.selectField,
    });
    // return result;
    const jwtPayload = { id, name, email, role };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expires_in });
    return {
        id,
        name,
        email,
        role,
        createdAt,
        profilePhoto,
        status,
        updatedAt,
        accessToken,
        refreshToken,
    };
});
// create user ends here
// login user stars here
const logIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check is user exists in database
    const isUserExists = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: { email },
    });
    // if exists comparse password
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExists.password);
    // if password not matched throw custom app error
    if (!isPasswordMatched) {
        throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Please check your email and password");
    }
    const { name, id, role } = isUserExists;
    const jwtPayload = { id, name, email, role };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expires_in });
    return { id, name, email, accessToken, refreshToken };
});
// login user ends here
// change password start here
const changePassword = (decodedUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure currentPassword and new password from payload
    const { currentPassword, newPassword } = payload;
    const { id } = decodedUser;
    const { password } = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: { id }, //if with email we get unique error when try to update user email then we have to set id as unique
    });
    // check if password matched
    const isPasswordMatched = yield bcrypt_1.default.compare(currentPassword, password);
    // if password not matched
    if (!isPasswordMatched) {
        throw new appError_error_1.AppError(http_status_1.default.UNAUTHORIZED, "Please check your email or password");
    }
    // if password match then hash new password
    const hashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.salt));
    const result = yield prisma_utlis_1.prisma.user.update({
        where: { id },
        data: { password: hashPassword },
        select: user_service_1.selectField,
    });
    return result;
});
// change password ends here
// View and Manage User Accounts: Activate/deactivate accounts, edit roles.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = client_1.UserRole.ADMIN;
    // generate salt
    const saltRounds = yield bcrypt_1.default.genSalt(Number(config_1.default.salt));
    // hash password
    payload.password = yield bcrypt_1.default.hash(payload.password, saltRounds);
    const result = yield prisma_utlis_1.prisma.user.create({
        data: payload,
        select: user_service_1.selectField,
    });
    return result;
});
//
// generate acccess token
const getAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const { status, role } = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: { email },
    });
    if (status === client_1.UserActiveStatus.BLOCKED) {
        throw new appError_error_1.AppError(http_status_1.default.NOT_FOUND, `User is ${status}`);
    }
    const jwtPayload = {
        email,
        role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return accessToken;
});
// ||
// ||
// export auth service functions starts here
exports.authServices = {
    addUser,
    logIn,
    changePassword,
    createAdmin,
    getAccessToken,
};
// export auth service functions ends here
