const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // Default status code
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";

    // pg errors
    if (err.code === "23505") {
      message = `Duplicate field value entered: ${err.detail}`;
      statusCode = 400;
    }
    // prisma errors
    if (err.code === "P2002") {
      message = `Duplicate field value entered: ${err.meta.target}`;
      statusCode = 400;
    }

    // Send error response
    res.status(statusCode).json({
      success: false,
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  } catch (error) {
    // If error processing fails, send generic error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default errorMiddleware;
