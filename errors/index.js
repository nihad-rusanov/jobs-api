const badRequest = require("./badRequest");
const customError = require("./customError");
const notFound = require("./notFound");
const unauthenticated = require("./unauthenticated");

module.exports = {
  unauthenticated,
  notFound,
  badRequest,
  customError,
};
