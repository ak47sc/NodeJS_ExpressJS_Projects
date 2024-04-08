const { customAPIError } = require("../errors/custom-error");
const customErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customAPIError) {
    return res.status(err.status).json({ msg: err.message });
  }

  return res.status(500).json({ msg: err });
};

module.exports = customErrorHandlerMiddleware;
