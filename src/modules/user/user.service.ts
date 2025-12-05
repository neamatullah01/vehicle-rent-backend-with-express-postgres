import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const getALLUsersFromDb = async () => {
  const result = await pool.query(`\
        SELECT id,name,email,phone,role FROM users
        `);
  return result;
};

const updateUserIntoDb = async (
  id: number,
  payload: Record<string, unknown>
) => {
  const { name, email, password, phone, role } = payload;
  let hashedPass = null;
  if (password) {
    hashedPass = await bcrypt.hash(password as string, 10);
  }
  const result = await pool.query(
    `
            UPDATE users SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            phone = COALESCE($4, phone),
            role = COALESCE($5, role)
            WHERE id=$6 RETURNING *
        `,
    [name, email, hashedPass, phone, role, id]
  );

  delete result.rows[0].password;
  return result;
};

const deleteUserFromDb = async (id: string) => {
  const activeBooking = await pool.query(
    `
        SELECT id FROM bookings WHERE customer_id= $1 AND status = 'active'
        `,
    [id]
  );
  if (activeBooking.rows.length > 0) {
    return false;
  }
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
};

export const userServices = {
  getALLUsersFromDb,
  updateUserIntoDb,
  deleteUserFromDb,
};
