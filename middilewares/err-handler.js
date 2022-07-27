const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "something went wrong try again later",
  };

  if ((err.name = "ValidateError")) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field please choose another value`;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandler;
