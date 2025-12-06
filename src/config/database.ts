import { Pool } from "pg";
import config from "./config";

export const pool = new Pool({ connectionString: config.database_url });
async function initDB() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS
     users(
     id SERIAL PRIMARY KEY,
     name VARCHAR(100)NOT NULL,
     email VARCHAR(200) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     phone VARCHAR(100)NOT NULL,
     role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer')),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
     )`
  );

  await pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
   id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
  registration_number VARCHAR(100) NOT NULL UNIQUE,
  daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
  availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
    )`);
}
export default initDB;
