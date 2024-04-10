import { validate } from '../../../config/validate.js'

export class RegistrarUsuarioDto {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }

  static create(obj = {}) {
    const { name, email, password } = obj

    if (!email && !password && !name) return ['El nombre, email, password son obligatorios'];
    if (!email) return ['El email es obligatorio'];
    if (!name) return ['El nombre es obligatorio'];
    if (!password) return ['Password es obligatorio'];
    if (!validate.name(name)) return ['El nombre es debe tener mas de 3 letras.'];
    if (!validate.email(email)) return ['El email no es valido.'];
    if (!validate.passwordModerate(password)) return ['El password debe incluir Mayusculas, Minusculas, numeros y debe tener mas de 8 letras'];

    return [undefined, new RegistrarUsuarioDto(name, email, password)]
  }
}
