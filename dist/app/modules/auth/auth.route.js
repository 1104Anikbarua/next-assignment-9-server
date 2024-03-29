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
const router = express_1.default.Router();
// create user routes
router.post("/register", (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.createUserValidation), auth_controller_1.authControllers.addUser);
router.post("/login", (0, validateRequest_middleware_1.validateRequest)(auth_validation_1.authValidations.loginValidation), auth_controller_1.authControllers.login);
exports.authRoutes = router;
