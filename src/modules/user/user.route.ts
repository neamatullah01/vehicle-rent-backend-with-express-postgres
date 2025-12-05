import { Router } from "express";
import { userControllers } from "./user.controller";
import verify from "../../middleware/verify";

const router = Router();

router.get("/", verify("admin"), userControllers.getAllUsers);
router.put("/:userId", verify("admin", "customer"), userControllers.updateUser);
router.delete("/:userId", verify("admin"), userControllers.deleteUser);

export const userRoutes = router;
