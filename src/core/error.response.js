"use strict";

const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const ReasonStatusCode = {
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden Error",
  NOT_FOUND: "Not Found",
  CONFLICT: "Conflict Error",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  TOO_MANY_REQUESTS: "Too Many Requests",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  SERVICE_UNAVAILABLE: "Service Unavailable",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

// 400 - request sai format, thiếu field, tham số không hợp lệ
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.BAD_REQUEST,
    status = StatusCode.BAD_REQUEST,
  ) {
    super(message, status);
  }
}

// 401 - chưa đăng nhập, thiếu / sai token, sai api key
class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.UNAUTHORIZED,
    status = StatusCode.UNAUTHORIZED,
  ) {
    super(message, status);
  }
}

// 403 - đã xác thực nhưng không có quyền
class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    status = StatusCode.FORBIDDEN,
  ) {
    super(message, status);
  }
}

// 404 - không tìm thấy resource (shop, product, ...)
class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.NOT_FOUND,
    status = StatusCode.NOT_FOUND,
  ) {
    super(message, status);
  }
}

// 409 - trùng dữ liệu (email đã đăng ký, ...)
class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    status = StatusCode.CONFLICT,
  ) {
    super(message, status);
  }
}

// 422 - đúng format nhưng dữ liệu không hợp lệ về nghiệp vụ (validate fail)
class UnprocessableEntityError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.UNPROCESSABLE_ENTITY,
    status = StatusCode.UNPROCESSABLE_ENTITY,
  ) {
    super(message, status);
  }
}

// 429 - gọi API quá nhiều (rate limit)
class TooManyRequestsError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.TOO_MANY_REQUESTS,
    status = StatusCode.TOO_MANY_REQUESTS,
  ) {
    super(message, status);
  }
}

// 500 - lỗi phía server (tạo token thất bại, lỗi không mong muốn, ...)
class InternalServerError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.INTERNAL_SERVER_ERROR,
    status = StatusCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status);
  }
}

// 503 - service phụ thuộc (db, redis, ...) đang không sẵn sàng
class ServiceUnavailableError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.SERVICE_UNAVAILABLE,
    status = StatusCode.SERVICE_UNAVAILABLE,
  ) {
    super(message, status);
  }
}

export {
  ErrorResponse,
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
  ConflictRequestError,
  UnprocessableEntityError,
  TooManyRequestsError,
  InternalServerError,
  ServiceUnavailableError,
};
