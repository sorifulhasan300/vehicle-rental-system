import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import { authRouter } from "../auth/auth.route";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleController.createVehicle);
router.put("/:vehicleId", vehicleController.updateVehicle);
router.delete("/:vehicleId", vehicleController.deleteVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.get("/", vehicleController.getAllVehicles);

export const vehicleRouter = router;
