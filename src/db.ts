import { Pool } from "pg";
import { parse } from "pg-connection-string";

import { POSTGRES_CONNECTION_STRING } from "./configuration";

const config = parse(POSTGRES_CONNECTION_STRING);

export const pool = new Pool({
  user: config.user,
  database: config.database,
  password: config.password,
  port: parseInt(config.port),
  host: config.host,
});
