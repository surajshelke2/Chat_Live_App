class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message), 
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (error, req, res, next) => {
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

module.exports = {errorMiddleware,ErrorHandler}

