import express, { NextFunction, Request, Response } from "express";
import { authControllers } from "./auth.controller";
import { authValidations } from "./auth.validation";
import { validateRequest } from "../../utlis/validateRequest.utlis";

const router = express.Router();

// create user routes
router.post(
  "/register",
  validateRequest(authValidations.createUserValidation),
  authControllers.addUser
);
router.post(
  "/login",
  validateRequest(authValidations.loginValidation),
  authControllers.login
);

export const authRoutes = router;
