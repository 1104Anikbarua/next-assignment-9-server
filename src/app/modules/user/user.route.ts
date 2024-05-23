import express from "express";
import { userControllers } from "./user.controller";
import { auth } from "../../middleware/auth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { userValidations } from "./user.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

// get user profile route
router.get("/profile", auth(), userControllers.getProfile);
// update user profile route
router.put(
  "/set-profile",
  auth(),
  validateRequest(userValidations.updateUserValidations),
  userControllers.setProfile,
);
router.patch(
  "/:id/set-status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userControllers.setStatus,
);
export const userRoutes = router;
