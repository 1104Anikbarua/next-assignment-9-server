import express from "express";
import { authControllers } from "./auth.controller";
import { authValidations } from "./auth.validation";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { auth } from "../../middleware/auth.middleware";
import { UserRole } from "@prisma/client";

const router = express.Router();

// create user routes
router.post(
  "/create-user",
  validateRequest(authValidations.createUserValidation),
  authControllers.addUser,
);
router.post(
  "/login",
  validateRequest(authValidations.loginValidation),
  authControllers.login,
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.BUDDY, UserRole.SUPER_ADMIN),
  validateRequest(authValidations.changePassword),
  authControllers.changePassword,
);

// create admin routes
router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(authValidations.createUserValidation),
  authControllers.createAdmin,
);

// refresh token route
router.post(
  "/refresh-token",
  validateRequest(authValidations.refreshToken),
  authControllers.getRefreshToken,
);
export const authRoutes = router;
