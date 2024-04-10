import { CustomError } from "../errors/custom.error.js"

export class UserEntity {

  constructor( id, name, email, password,) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static fromObject(obj = {}) {
    const { _id, id, name, email, password } = obj

    if (!_id && id) throw CustomError.badRequest('Missing id')
    if (!name) throw CustomError.badRequest('Missing name')
    if (!email) throw CustomError.badRequest('Missing email')
    if (!password) throw CustomError.badRequest('Missing password')

    return new UserEntity(id || _id, name, email, password)
  }
}
