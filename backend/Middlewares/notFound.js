const { HttpError } = require('../Utils/http');

function notFound(req, res, next) {
  next(new HttpError(404, `Route ${req.originalUrl} not found`));
}


module.exports = notFound;

