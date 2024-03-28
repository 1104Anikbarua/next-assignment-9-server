import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { tripRoutes } from "../modules/trip/trip.route";
import { travelBuddyRoutes } from "../modules/travelBuddy/travelBuddy.route";

const router = express.Router();

const moduleRoutes = [
  {
    // path: "/register",
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: tripRoutes,
  },
  { path: "/", route: travelBuddyRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export const indexRoutes = router;
