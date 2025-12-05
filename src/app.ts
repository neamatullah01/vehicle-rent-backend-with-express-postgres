import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle server is running...");
});

export default app;
