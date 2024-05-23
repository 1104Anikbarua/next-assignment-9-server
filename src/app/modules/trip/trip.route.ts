import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { tripControllers } from "./trip.controller";
import { tripValidations } from "./trip.validation";
import { auth } from "../../middleware/auth.middleware";
const router = express.Router();

// // create trip starts here
// router.post(
//   "/trips",
//   auth(),
//   validateRequest(tripValidations.createTripValidation),
//   tripControllers.createTrip,
// );
// create trip starts here
router.post(
  "/create-travel",
  auth(),
  validateRequest(tripValidations.createTravelValidation),
  tripControllers.createTravel,
);

// get all trips
// router.get("/trips", tripControllers.getTrips);

// get all travel
router.get("/", tripControllers.getTravels);

// get singl travel
router.get("/single-travel", auth(), tripControllers.getTravel);
// post all trips
router.post(
  "/trip/:tripId/request",
  auth(),
  validateRequest(tripValidations.requestBuddyValidations),
  tripControllers.requestBuddy,
);
export const tripRoutes = router;
