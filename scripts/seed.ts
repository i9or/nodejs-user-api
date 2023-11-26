import "dotenv/config";

import * as bcrypt from "bcrypt";

import { pool } from "../src/db";
import { User } from "../src/models/User";

const exampleUserList: Partial<User>[] = [
  {
    email: "admin@example.com",
    name: "John Doe",
    role: "ADMIN",
    password: "super_secret!",
  },
  {
    email: "hagler@example.com",
    name: "Sherri Hagler",
    role: "USER",
    password: "hello1!",
  },
  {
    email: "sabb@example.com",
    name: "Lamesha Sabb",
    role: "USER",
    password: "hello2!",
  },
  {
    email: "humphreys@example.com",
    name: "Carrie Humphreys",
    role: "USER",
    password: "hello3!",
  },
];

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users
      (
        id           bigserial,
        name         varchar(255)                                  NOT NULL,
        email        varchar(255) UNIQUE                           NOT NULL,
        password     varchar(255)                                  NOT NULL,
        role         varchar(10) CHECK (role IN ('USER', 'ADMIN')) NOT NULL,
        access_token uuid DEFAULT gen_random_uuid()                NOT NULL
      );
    `);

    for (let user of exampleUserList) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING;
    `,
        [user.name, user.email, hashedPassword, user.role],
      );
    }
  } catch (err) {
    console.error(err);
  }
})();
