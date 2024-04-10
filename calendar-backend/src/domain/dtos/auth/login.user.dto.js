import { validate } from '../../../config/validate.js'

export class LoginUsuarioDto {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  static create(obj = {}) {
    const { email, password } = obj

    if (!email && !password) return ['El email y password son obligatorios'];
    if (!email) return ['El email es obligatorio'];
    if (!password) return ['Password es obligatorio'];
    if (!validate.email(email)) return ['El email no es valido.'];
    if (!validate.passwordModerate(password)) return ['Password incorrecto'];

    return [undefined, new LoginUsuarioDto(email, password)]
  }
}
