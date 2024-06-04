import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRoutes } from "./app/routes/routes";
import { handleGlobalError } from "./app/middleware/globalError.middleware";
import { handleNotFound } from "./app/middleware/notFound.middleware";
const app = express();

//parse json object
app.use(express.json());
// handle cors origin
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
// without cookie parser you cannot access the cookie
app.use(cookieParser());
//connect to the index routes
app.use("/api/v1", indexRoutes);

app.use("/", (req: Request, res: Response) => {
  res.send("Hellow world");
});

// basic global error handler
app.use(handleGlobalError);

app.use(handleNotFound);

export default app;
