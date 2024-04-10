
export class CustomError extends Error {

  constructor(
     statusCode,
     message
  ) {
    super(message)
    this.statusCode = statusCode
    // this.name = 'CustomError'
  }

  static badRequest(message) {
    return new CustomError(400, message)
  }

  static anauthorized(message) {
    return new CustomError(401, message)
  }
  static forbiden(message) {
    return new CustomError(403, message)
  }
  static noFound(message) {
    return new CustomError(404, message)
  }
  static internalServer(message) {
    return new CustomError(500, message)
  }
}



