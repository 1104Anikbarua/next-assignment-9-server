import express from "express";
import { authRoutes } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/register", route: authRoutes },
  { path: "/login", route: authRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export const indexRoutes = router;
