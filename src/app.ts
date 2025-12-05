import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/vehicles", vehicleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle server is running...");
});

export default app;
