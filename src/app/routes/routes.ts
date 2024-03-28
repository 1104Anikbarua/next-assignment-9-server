import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { tripRoutes } from "../modules/trip/trip.route";
import { travelBuddyRoutes } from "../modules/travelBuddy/travelBuddy.route";
import { userRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: tripRoutes,
  },
  {
    path: "/",
    route: travelBuddyRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export const indexRoutes = router;
