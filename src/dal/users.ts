import { Err, Ok, Result } from "../framework/Result";
import { User, UserRole } from "../models/User";
import { pool } from "../db";

type UsersTable = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  access_token: string;
};

export const getUserByEmail = async (
  email: string,
): Promise<Result<User, unknown>> => {
  try {
    const { rowCount, rows } = await pool.query<UsersTable>(
      `
        SELECT *
        FROM users
        WHERE email ILIKE $1
      `,
      [email],
    );

    if (rowCount === 0) {
      return Err("Not found");
    }

    return Ok({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role,
      password: rows[0].password,
      accessToken: rows[0].access_token,
    });
  } catch (err: unknown) {
    return Err(err);
  }
};
