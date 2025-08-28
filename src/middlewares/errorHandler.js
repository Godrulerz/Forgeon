// Centralized error handling middleware
// Usage: next(createError(404, 'Not found')) or throw errors in async handlers

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  if (process.env.NODE_ENV !== 'test') {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      statusCode,
      path: req.originalUrl || req.url,
      method: req.method,
    });
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;


