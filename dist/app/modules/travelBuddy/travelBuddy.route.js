"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelBuddyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const travelBuddy_controller_1 = require("./travelBuddy.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const travelBuddy_validation_1 = require("./travelBuddy.validation");
const router = express_1.default.Router();
//get travel buddy starts here
router.get("/travel-buddies/:tripId", (0, auth_middleware_1.auth)(), travelBuddy_controller_1.travelBuddyController.getTravelBuddies);
// respond travel buddy starts here
router.put("/travel-buddies/:buddyId/respond", (0, auth_middleware_1.auth)(), (0, validateRequest_middleware_1.validateRequest)(travelBuddy_validation_1.travelBuddyValidations.respondRequest), travelBuddy_controller_1.travelBuddyController.responsdTravelBuddy);
//get travel buddy ends here
exports.travelBuddyRoutes = router;
