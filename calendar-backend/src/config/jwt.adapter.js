import jwt from 'jsonwebtoken'

const JWT_SEED = process.env.SECRET_JWT

export class JwtAdapter {

  static generateJWT = (payload, duration = '2h') => {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {
        if( err ) return resolve(null)

        resolve(token)
      })
    })
  }

  static validateJwt = (token) => {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if ( err ) return resolve(null);

        resolve(decoded)
      })
    })
  }
}


