"use strict";
const { STATUS_CODES } = require("../util/constant");

class SuccessResponse {
  constructor({
    message = STATUS_CODES.OK.message,
    statusCode = STATUS_CODES.OK.code,
    reason = STATUS_CODES.OK.message,
    metadata = {},
  }) {
    this.message = message;
    this.statusCode = statusCode;
    this.reason = reason;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.statusCode).json(this);
  }
}
class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}
class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODES.OK.code,
    reason = STATUS_CODES.OK.message,
    metadata,
  }) {
    super({ message, statusCode, reason, metadata });
  }
}
class SUCCESS extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODES.code,
    reason = STATUS_CODES.SUCCESS.message,
    metadata,
  }) {
    super({ message, statusCode, reason, metadata });
  }
}
module.exports = {
  OK,
  CREATED,
  SUCCESS
};
