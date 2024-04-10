import pkg from 'bcryptjs'
const { compareSync, genSaltSync, hashSync } = pkg

export class BcryptAdapter {

  static has( password ) {
    const salt = genSaltSync()
    return hashSync(password, salt)
  }

  static compare( password, hashed ) {
    return compareSync(password, hashed)
  }

}
