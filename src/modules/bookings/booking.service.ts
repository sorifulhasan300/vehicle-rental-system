import { pool } from "../../config/database";

const vehicleBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  if (startDate > endDate) {
    throw new Error("Rent end date must be after start date.");
  }
  const result = await pool.query(
    "INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date) VALUES($1,$2,$3,$4) RETURNING *",
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );
  if (result.rowCount === 0) {
    throw new Error("Some think was wrong");
  }
  const bookingId = result.rows[0].id;
  const bookingWithVehicle = await pool.query(
    `SELECT b.*,vehicle_name AS vehicle_name,
     v.daily_rent_price,
     v.availability_status 
     FROM bookings b
     JOIN vehicles v ON b.vehicle_id = v.id
     WHERE b.id = $1;
`,
    [bookingId]
  );
  const booking = bookingWithVehicle.rows[0];
  if (booking.availability_status === "booked") {
    throw new Error("This vehicle already booked");
  }
  await pool.query(
    `UPDATE vehicles
     SET availability_status = 'booked'
     WHERE id = $1`,
    [vehicle_id]
  );

  const duration_days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const total_price = booking.daily_rent_price * duration_days;

  return {
    id: booking.id,
    customer_id: booking.customer_id,
    vehicle_id: booking.vehicle_id,
    rent_start_date: booking.rent_start_date,
    rent_end_date: booking.rent_end_date,
    total_price: total_price,
    status: booking.status,
    vehicle: {
      vehicle_name: booking.vehicle_name,
      daily_rent_price: booking.daily_rent_price,
    },
  };
};

const getBookings = async () => {
  const bookings = await pool.query(`SELECT * FROM bookings`);
  if (bookings.rowCount === 0) {
    throw new Error("Bookings Not Available");
  }
  return bookings.rows;
};

const updateBookingStatus = async (id: string, status: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  console.log(result);
  if (result.rowCount === 0) {
    throw new Error("Booking Not Found");
  }
  const bookings = result.rows[0];
  const startDate = bookings.rent_end_date;
  const endDate = bookings.rows[0].rent_end_date;
  const duration_days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = duration_days * 100;
  console.log(startDate, endDate, bookings, totalPrice);

  return {
    id: bookings.id,
    customer_id: bookings.customer_id,
    vehicle_id: bookings.vehicle_id,
    rent_start_date: bookings.rent_start_date,
    rent_end_date: bookings.rent_end_date,
    total_price: totalPrice,
    status: bookings.status,
    vehicle: {
      availability_status: bookings.availability_status,
    },
  };
};

export const bookingService = {
  vehicleBooking,
  getBookings,
  updateBookingStatus,
};
