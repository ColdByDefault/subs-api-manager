import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} from "../config/env.js";

import { Pool } from "pg";

const pool = new Pool({
  host: DB_HOST, // Database host
  port: DB_PORT, // Database port
  user: DB_USER, // Database user
  password: DB_PASSWORD, // Database password
  database: DB_NAME, // Database name
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

// Function to test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully!");

    // Test a simple query
    const result = await client.query("SELECT NOW()");
    console.log("Current time from database:", result.rows[0].now);

    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
}

// Function to initialize database connection
export async function connectDatabase() {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log("Database connection pool initialized");
      return pool;
    } else {
      throw new Error("Failed to establish database connection");
    }
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
}

export default pool;
