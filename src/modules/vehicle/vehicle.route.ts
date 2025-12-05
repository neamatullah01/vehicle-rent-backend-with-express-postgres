import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import verify from "../../middleware/verify";

const router = Router();

router.post("/", verify("admin"), vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getAllVehicle);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);
router.put("/:vehicleId", verify("admin"), vehicleControllers.updateVehicle);
router.delete("/:vehicleId", verify("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
