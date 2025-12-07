import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", bookingController.vehicleBooking);
router.get("/", bookingController.getBookings);
router.put("/:bookingId", bookingController.updateBookingStatus);

export const bookingRouter = router;
