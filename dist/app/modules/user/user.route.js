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
const router = express_1.default.Router();
// get user profile route
router.get("/profile", (0, auth_middleware_1.auth)(), user_controller_1.userControllers.getProfile);
// update user profile route
router.put("/profile", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(user_validation_1.userValidations.updateUserValidations), user_controller_1.userControllers.setStatus);
exports.userRoutes = router;
