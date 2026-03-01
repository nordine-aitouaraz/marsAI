const { HttpError } = require('../Utils/http');

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const _next = next;

  const status = err instanceof HttpError ? err.status : 500;
  const payload = {
    error: err.message || 'Internal Server Error',
  };

  if (err instanceof HttpError && err.details !== undefined) {
    payload.details = err.details;
  }

  // Log minimal en dev
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;

