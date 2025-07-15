import HTTP_statusCode from '../constants/httpStatusCodes.js';

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || HTTP_statusCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
