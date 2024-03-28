import express from "express";
import { travelBuddyController } from "./travelBuddy.controller";
import { auth } from "../../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/travel-buddies/:tripId",
  auth(),
  travelBuddyController.getTravelBuddies
);

export const travelBuddyRoutes = router;
