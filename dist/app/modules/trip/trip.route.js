"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// // create trip starts here
// router.post(
//   "/trips",
//   auth(),
//   validateRequest(tripValidations.createTripValidation),
//   tripControllers.createTrip,
// );
// create trip starts here
router.post("/create-travel", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(trip_validation_1.tripValidations.createTravelValidation), trip_controller_1.tripControllers.createTravel);
// get all trips
// router.get("/trips", tripControllers.getTrips);
// get all travel
router.get("/", trip_controller_1.tripControllers.getTravels);
// get singl travel
router.get("/single-travel", (0, auth_middleware_1.auth)(), trip_controller_1.tripControllers.getTravel);
// // post a trips request
// router.post(
//   "/trip/:tripId/request",
//   auth(),
//   validateRequest(tripValidations.requestBuddyValidations),
//   tripControllers.requestBuddy,
// );
// post all trips
//post a travel request
router.post("/travel/:travelId/request", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(trip_validation_1.tripValidations.requestBuddyValidations), trip_controller_1.tripControllers.requestBuddy);
// post a travel request
router.get("/travel-request", (0, auth_middleware_1.auth)(), trip_controller_1.tripControllers.getRequestedTravels);
// update a travel
router.patch("/:travelId/set-travel", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_middleware_1.validateRequest)(trip_validation_1.tripValidations.updateTravelValidations), trip_controller_1.tripControllers.setTravel);
// delete a travel
router.delete("/:travelId/remove-travel", (0, auth_middleware_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), trip_controller_1.tripControllers.removeTravel);
//
exports.tripRoutes = router;
