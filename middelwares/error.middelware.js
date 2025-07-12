

const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        // pg errors
        if (err.code === "23505") {
            const message = `Duplicate field value entered: ${err.detail}`;
            error = new Error(message);
            error.statusCode = 400;
        }
        // prisma errors
        if (err.code === "P2002") {
            const message = `Duplicate field value entered: ${err.meta.target}`;
            error = new Error(message);
            error.statusCode = 400;
        }
    } catch (error){
        next(error);
    }
};

export default errorMiddleware;