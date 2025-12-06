import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import verify from "../../middleware/verify";

const router = Router();

router.post("/", verify("admin", "customer"), bookingControllers.addBooking);
router.get("/", verify("admin", "customer"), bookingControllers.getAllBooking);
router.put(
  "/:bookingId",
  verify("admin", "customer"),
  bookingControllers.updateBooking
);
export const bookingRoutes = router;
