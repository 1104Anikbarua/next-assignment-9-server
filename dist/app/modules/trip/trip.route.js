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
const router = express_1.default.Router();
// create trip starts here
router.post("/trips", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(trip_validation_1.tripValidations.createTripValidation), trip_controller_1.tripControllers.createTrip);
// get all trips
router.get("/trips", trip_controller_1.tripControllers.getTrips);
// post all trips
router.post("/trip/:tripId/request", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(trip_validation_1.tripValidations.requestBuddyValidations), trip_controller_1.tripControllers.requestBuddy);
exports.tripRoutes = router;
