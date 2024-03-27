import express, { Request, Response } from "express";
import cors from "cors";
import { indexRoutes } from "./app/routes/routes";
const app = express();

//parse json object
app.use(express.json());
// handle cors origin
app.use(cors());

//connect to the index routes
app.use("/api", indexRoutes);

app.use("/", (req: Request, res: Response) => {
  res.send("Hellow world");
});

export default app;
