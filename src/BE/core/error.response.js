'use strict'
const {STATUS_CODES} = require('../util/constant')
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
class ConflictRequestError extends ErrorResponse {
    constructor(message = STATUS_CODES.CONFLICT.message, status= STATUS_CODES.CONFLICT.code) {
        super(message, status)
    }
}
class BadRequestError extends ErrorResponse {
    constructor(message = STATUS_CODES.BAD_REQUEST.message, status= STATUS_CODES.BAD_REQUEST.code) {
        super(message, status)
    }
}
class UnAuthorizedRequestError extends ErrorResponse {
    constructor(message = STATUS_CODES.UNAUTHORIZED.message, status= STATUS_CODES.UNAUTHORIZED.code) {
        super(message, status)
    }
}
class ForbiddenRequestError extends ErrorResponse {
    constructor(message = STATUS_CODES.UNAUTHORIZED.message, status= STATUS_CODES.UNAUTHORIZED.code) {
        super(message, status)
    }
}
module.exports = {
    ConflictRequestError,
    BadRequestError,
    UnAuthorizedRequestError,
    ForbiddenRequestError
}