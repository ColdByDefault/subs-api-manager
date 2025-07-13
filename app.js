import express from "express";
import { PORT } from "./config/env.js";
import { connectDatabase } from "./db/database.js";
import subscriptionRouter from "./routes/subscription.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middelwares/error.middelware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middelwares/arcjet.middleware.js";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);


app.get("/", (req, res) => {
  res.send("Subscription API Management!");
});

// Routing
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Error middleware should be last
app.use(errorMiddleware);

// Initialize database connection and start server
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(
        `Subscription API Management is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
