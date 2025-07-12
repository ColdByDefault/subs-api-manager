import { config } from "dotenv";

// Load the base .env file first
config({ path: ".env" });

// Then load environment-specific file if NODE_ENV is set
if (process.env.NODE_ENV === "production") {
  config({ path: ".env.prod.local" });
}

export const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRATION,
} = process.env;
