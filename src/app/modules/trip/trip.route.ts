import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { tripControllers } from "./trip.controller";
import { tripValidations } from "./trip.validation";
import { auth } from "../../middleware/auth.middleware";
const router = express.Router();

// create trip starts here
router.post(
  "/trips",
  auth(),
  validateRequest(tripValidations.createTripValidation),
  tripControllers.createTrip
);

export const tripRoutes = router;
