import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connection_str,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE CHECK (email = LOWER(email)),
        password VARCHAR(250) NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
        )
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(250) NOT NULL,
        type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) NOT NULL UNIQUE,
        daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(20) CHECK (availability_status IN ('available', 'booked'))
        )
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id),
        vehicle_id INT NOT NULL REFERENCES vehicles(id),
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date >= rent_start_date),
        total_price INT NOT NULL CHECK (total_price > 0),
        status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'returned'))
        )
        `);
};

export default initDB;
