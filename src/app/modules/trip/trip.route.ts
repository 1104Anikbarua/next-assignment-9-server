import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { tripControllers } from "./trip.controller";
import { tripValidations } from "./trip.validation";
import { auth } from "../../middleware/auth.middleware";
import { UserRole } from "@prisma/client";
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
router.get("/", auth(UserRole.BUDDY), tripControllers.getTravels);

//get travel by travel id
router.get(
  "/:id",
  auth(UserRole.BUDDY, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  tripControllers.getTravelById,
);

// get single travel by user id
router.get("/single-travel", auth(), tripControllers.getTravel);
// // post a trips request
// router.post(
//   "/trip/:tripId/request",
//   auth(),
//   validateRequest(tripValidations.requestBuddyValidations),
//   tripControllers.requestBuddy,
// );
// post all trips
//post a travel request
router.post(
  "/travel/:travelId/request",
  auth(),
  validateRequest(tripValidations.requestBuddyValidations),
  tripControllers.requestBuddy,
);
// post a travel request
router.get("/travel-request", auth(), tripControllers.getRequestedTravels);
// update a travel
router.patch(
  "/:travelId/set-travel",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(tripValidations.updateTravelValidations),
  tripControllers.setTravel,
);
// delete a travel
router.delete(
  "/:travelId/remove-travel",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  tripControllers.removeTravel,
);
//
export const tripRoutes = router;
