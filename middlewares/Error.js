export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.meassage = err.message || "Internal server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
