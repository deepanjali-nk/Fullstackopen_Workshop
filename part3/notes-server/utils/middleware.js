// Centralized error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Malformatted ID' });
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'Token expired'
      });
    }
    next(error);
  };

module.exports = { errorHandler };