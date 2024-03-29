import express from "express";
import { userControllers } from "./user.controller";
import { auth } from "../../middleware/auth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { userValidations } from "./user.validation";

const router = express.Router();

// get user profile route
router.get("/profile", auth(), userControllers.getProfile);
// update user profile route
router.put(
  "/profile",
  auth(),
  validateRequest(userValidations.updateUserValidations),
  userControllers.setStatus,
);
export const userRoutes = router;
