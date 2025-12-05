import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";
import { authRoutes } from "./modules/auth/auth.route";
import { userRoutes } from "./modules/user/user.route";
import { bookingRoutes } from "./modules/booking/booking.route";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle server is running...");
});

export default app;
