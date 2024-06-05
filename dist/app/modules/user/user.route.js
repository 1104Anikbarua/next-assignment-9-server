"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const user_validation_1 = require("./user.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// get user profile route
router.get("/profile", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.BUDDY, client_1.UserRole.SUPER_ADMIN), user_controller_1.userControllers.getProfile);
// get all users
router.get("/", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), user_controller_1.userControllers.getUsers);
// update user profile route
router.patch("/set-profile", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BUDDY), (0, validateRequest_middleware_1.validateRequest)(user_validation_1.userValidations.updateUserValidations), user_controller_1.userControllers.setProfile);
router.patch("/:id/set-status", (0, auth_middleware_1.auth)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.BUDDY), user_controller_1.userControllers.setStatus);
exports.userRoutes = router;
