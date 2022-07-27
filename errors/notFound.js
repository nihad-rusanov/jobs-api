const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class notFound extends customError {
  constructor(message, status) {
    super(message);
    status = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFound;
