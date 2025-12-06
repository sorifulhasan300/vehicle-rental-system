import { pool } from "../../config/database";

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string
) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2,phone=$3,role=$4 WHERE id = $5 RETURNING * ",
    [name, email, phone, role, id]
  );
  if (result.rowCount === 0) {
    throw new Error("User Update Unsuccessfully");
  }
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    throw new Error("User Delete Unsuccessfully");
  }
  return result;
};

export const userService = {
  getUsers,
  updateUser,
  deleteUser,
};
