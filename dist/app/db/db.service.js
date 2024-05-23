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
exports.createSuperAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_utlis_1 = require("../utlis/prisma.utlis");
const config_1 = __importDefault(require("../config"));
const superAdmin = {
    name: "anik barua",
    email: "superadmin@gmail.com",
    password: "123456",
};
const createSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    //hash the plain text password
    try {
        // generate salt
        const saltRounds = yield bcrypt_1.default.genSalt(Number(config_1.default.salt));
        const hashPassword = yield bcrypt_1.default.hash(superAdmin.password, saltRounds);
        //   find already super admin exists or not
        const isSuperAdminExists = yield prisma_utlis_1.prisma.user.findUnique({
            where: {
                email: superAdmin.email,
            },
        });
        if (!isSuperAdminExists) {
            yield prisma_utlis_1.prisma.user.create({
                data: {
                    name: superAdmin.name,
                    email: superAdmin.email,
                    password: hashPassword,
                    role: client_1.UserRole.SUPER_ADMIN,
                },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createSuperAdmin = createSuperAdmin;
