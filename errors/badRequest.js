const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class badRequest extends customError {
  constructor(message, status) {
    super(message);
    status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badRequest;
