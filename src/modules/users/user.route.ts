import { Router } from "express";
import { usersController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { updateUserGuard } from "../../middleware/updateGuird";

const router = Router();

// get users
router.get("/", auth("admin"), usersController.getUsers);
router.put(
  "/:userId",
  auth("admin", "customer"),
  updateUserGuard,
  usersController.updateUser
);
router.delete("/:userId", auth("admin"), usersController.deleteUser);

export const usersRouter = router;
