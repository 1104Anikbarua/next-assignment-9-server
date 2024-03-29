import express from "express";
import { travelBuddyController } from "./travelBuddy.controller";
import { auth } from "../../middleware/auth.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { travelBuddyValidations } from "./travelBuddy.validation";

const router = express.Router();

//get travel buddy starts here
router.get(
  "/travel-buddies/:tripId",
  auth(),
  travelBuddyController.getTravelBuddies,
);
// respond travel buddy starts here
router.put(
  "/travel-buddies/:buddyId/respond",
  auth(),
  validateRequest(travelBuddyValidations.respondRequest),
  travelBuddyController.responsdTravelBuddy,
);
//get travel buddy ends here

export const travelBuddyRoutes = router;
