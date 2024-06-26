const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong , Try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  
  if (err.name === "CastError") {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}, Please choose another value`;

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
