"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// create user routes
router.post("/create-user", (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.createUserValidation), auth_controller_1.authControllers.addUser);
router.post("/login", (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.loginValidation), auth_controller_1.authControllers.login);
router.post("/change-password", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.BUDDY, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.changePassword), auth_controller_1.authControllers.changePassword);
// create admin routes
router.post("/create-admin", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.createUserValidation), auth_controller_1.authControllers.createAdmin);
// refresh token route
router.post("/refresh-token", (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.refreshToken), auth_controller_1.authControllers.getRefreshToken);
exports.authRoutes = router;
