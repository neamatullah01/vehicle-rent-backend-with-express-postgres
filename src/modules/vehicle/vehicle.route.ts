import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getAllVehicle);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);

export const vehicleRoutes = router;
