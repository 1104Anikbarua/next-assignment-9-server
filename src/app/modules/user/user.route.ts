"use client";
import express from "express";
import { userControllers } from "./user.controller";
import { auth } from "../../middleware/auth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { userValidations } from "./user.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

// get user profile route
router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.BUDDY, UserRole.SUPER_ADMIN),
  userControllers.getProfile,
);

// get all users
router.get("/", userControllers.getUsers);
// update user profile route
router.patch(
  "/set-profile",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BUDDY),
  validateRequest(userValidations.updateUserValidations),
  userControllers.setProfile,
);
router.patch(
  "/:id/set-status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userControllers.setStatus,
);
export const userRoutes = router;
