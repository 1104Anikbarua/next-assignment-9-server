"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const trip_route_1 = require("../modules/trip/trip.route");
const travelBuddy_route_1 = require("../modules/travelBuddy/travelBuddy.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/trips",
        route: trip_route_1.tripRoutes,
    },
    {
        path: "/travelbuddy",
        route: travelBuddy_route_1.travelBuddyRoutes,
    },
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.indexRoutes = router;
