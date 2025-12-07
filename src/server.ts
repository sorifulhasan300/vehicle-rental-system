import express from "express";
import initDB from "./config/database";
import config from "./config/config";
import { authRouter } from "./modules/auth/auth.route";
import { usersRouter } from "./modules/users/user.route";
import { vehicleRouter } from "./modules/vehicles/vehicle.route";
import { bookingRouter } from "./modules/bookings/booking.route";

const app = express();
const port = config.port || 5000;

initDB();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/bookings", bookingRouter);

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
