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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const appError_error_1 = require("../../errorHanler/appError.error");
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
// create user starts here
const addUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile } = payload, user = __rest(payload, ["profile"]);
    // generate salt rounds
    const saltRounds = yield bcrypt_1.default.genSalt(Number(config_1.default.salt));
    // hash password
    user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
    // gather userinfo in a single variable
    const userInfo = Object.assign({}, user);
    const result = yield prisma_utlis_1.prisma.$transaction((prismaConstructor) => __awaiter(void 0, void 0, void 0, function* () {
        //create user
        const createUser = yield prismaConstructor.user.create({
            data: userInfo,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        //create profile
        const userProfile = Object.assign({ userId: createUser.id }, profile);
        const createProfile = yield prismaConstructor.userProfile.create({
            data: userProfile,
        });
        return createUser;
    }));
    return result;
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
        throw new appError_error_1.AppError(http_status_1.default.FORBIDDEN, "Please check your email and password");
    }
    const { name, id } = isUserExists;
    const jwtPayload = { id, name, email };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_expires_in,
    });
    return { id, name, email, token };
});
// login user ends here
// ||
// ||
// export auth service functions starts here
exports.authServices = {
    addUser,
    logIn,
};
// export auth service functions ends here
