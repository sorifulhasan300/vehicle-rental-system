import { Router } from "express";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleController.createVehicle);
router.put("/:vehicleId", vehicleController.updateVehicle);
router.delete("/:vehicleId", vehicleController.deleteVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.get("/", vehicleController.getAllVehicles);

export const vehicleRouter = router;
