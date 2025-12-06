import { pool } from "../../config/database";

const createVehicle = async (payload: Record<string, unknown>) => {
  console.log(payload);
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  if (result.rowCount === 0) {
    throw new Error("Vehicle created unsuccessfully");
  }
  return result.rows[0];
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  if (result.rowCount === 0) {
    throw new Error("Vehicle not found");
  }
  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  if (result.rowCount === 0) {
    throw new Error("Vehicles not found");
  }
  return result.rows;
};

const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
  console.log(id);
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2,registration_number=$3,daily_rent_price=$4, availability_status=$5 WHERE id = $6 RETURNING * `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  if (result.rowCount === 0) {
    throw new Error("Vehicle update unsuccessfully");
  }
  return result.rows[0];
};

const deleteVehicle = async (id: string) => {
  console.log(id);
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  if (result.rowCount === 0) {
    throw new Error("Vehicle delete unsuccessfully");
  }
  return result.rows[0];
};

export const vehicleService = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getSingleVehicle,
  getAllVehicles,
};
