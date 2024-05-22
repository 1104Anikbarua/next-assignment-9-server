import express from "express";
import { authControllers } from "./auth.controller";
import { authValidations } from "./auth.validation";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { auth } from "../../middleware/auth.middleware";

const router = express.Router();

// create user routes
router.post(
  "/register",
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
  auth(),
  validateRequest(authValidations.changePassword),
  authControllers.changePassword,
);
export const authRoutes = router;
