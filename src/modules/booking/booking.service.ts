import { pool } from "./../../config/db";

const addBookingsIntoDb = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleDetails = await pool.query(
    `SELECT vehicle_name, daily_rent_price,availability_status FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleDetails.rows.length === 0) {
    return false;
  }
  const availableBooking = vehicleDetails.rows[0].availability_status;
  if (availableBooking === "booked") {
    return false;
  }
  const dailyRate = vehicleDetails.rows[0].daily_rent_price;

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);
  const diffMs = end.getTime() - start.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const total_price = dailyRate * days;

  const result = await pool.query(
    `
        INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,'active') RETURNING *
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  if (result.rows[0]) {
    await pool.query(
      `
        UPDATE vehicles SET availability_status='booked' WHERE id=$1
        `,
      [vehicle_id]
    );
  }

  const booking = result.rows[0];
  const vehicle = vehicleDetails.rows[0];
  delete vehicle.availability_status;
  return { ...booking, vehicle };
};

const getAllBookingFromDb = async () => {
  const result = await pool.query(`
    SELECT 
      b.*,
      u.name,
      u.email,
      v.vehicle_name,
      v.registration_number
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    JOIN users u ON b.customer_id = u.id
  `);
  const allBookings = result.rows.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    customer: {
      name: row.name,
      email: row.email,
    },
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
    },
  }));
  return allBookings;
};

const getCustomerBookings = async (id: number) => {
  const result = await pool.query(
    `
    SELECT 
      b.*,
      v.vehicle_name,
      v.registration_number,
      v.type
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return false;
  }
  const customerBooking = result.rows.map((row) => ({
    id: row.id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
      type: row.type,
    },
  }));
  return customerBooking;
};

const updateForAdmin = async (id: string, status: string) => {
  const result = await pool.query(
    `
      UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
      `,
    [status, id]
  );
  if (result.rows.length === 0) {
    return false;
  }
  const vehicle_id = result.rows[0].vehicle_id;
  let vehicleStatus: any;
  if (result.rows[0].status === "returned") {
    vehicleStatus = await pool.query(
      `
        UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING availability_status
        `,
      [vehicle_id]
    );
  }
  const booking = result.rows[0];
  const vehicle = vehicleStatus.rows[0];
  return { ...booking, vehicle };
};

const updateForCustomer = async (
  customerId: number,
  id: string,
  status: string
) => {
  const bookingResult = await pool.query(
    `
    SELECT * FROM bookings WHERE id= $1
    `,
    [id]
  );
  if (bookingResult.rowCount === 0) {
    return false;
  }
  const booking = bookingResult.rows[0];
  const bookingCustomerId = Number(booking.customer_id);

  if (bookingCustomerId !== customerId || booking.status === "cancelled") {
    return false;
  }

  const now = new Date();
  const startDate = new Date(booking.rent_start_date);
  if (now >= startDate) {
    return false;
  }
  const result = await pool.query(
    `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`,
    [id]
  );
  if (result.rows.length === 0) {
    return false;
  }
  const vehicle_id = result.rows[0].vehicle_id;
  if (result.rows[0].status === "cancelled") {
    await pool.query(
      `
        UPDATE vehicles SET availability_status='available' WHERE id=$1
        `,
      [vehicle_id]
    );
  }
  return result.rows[0];
};

export const bookingServices = {
  addBookingsIntoDb,
  getAllBookingFromDb,
  getCustomerBookings,
  updateForAdmin,
  updateForCustomer,
};
