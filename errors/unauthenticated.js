const customError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class unauthenticated extends customError {
  constructor(message, status) {
    super(message);
    status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unauthenticated;
