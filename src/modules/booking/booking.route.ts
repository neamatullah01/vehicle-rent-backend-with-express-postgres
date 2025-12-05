import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import verify from "../../middleware/verify";

const router = Router();

router.post("/", verify("admin", "customer"), bookingControllers.addBooking);
router.get("/", bookingControllers.getAllBooking);
export const bookingRoutes = router;
