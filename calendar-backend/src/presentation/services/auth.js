import { UserModel } from "../../data/mongo/models/usuario.model.js"
import { CustomError } from "../../domain/index.js"
import { UserEntity } from "../../domain/entities/user.entiry.js"
import { BcryptAdapter, JwtAdapter } from "../../config/index.js"

export class AuthService {

  constructor() {}

  registerUser = async ( registerUserDto ) => {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email })
    if ( existsUser ) throw CustomError.badRequest('Email already exists')

    try {
      const usuario = new UserModel( registerUserDto )
      // encriptar password
      usuario.password = BcryptAdapter.has(registerUserDto.password)

      // crear usuario
      await usuario.save()

      const {password, ...usuarioEntity} = UserEntity.fromObject(usuario)

      // generart jwt
      const token = await JwtAdapter.generateJWT({id: usuario.id})
      if ( !token ) throw CustomError.badRequest('Error while creating JWT')

      return {
        ok: true,
        user: usuarioEntity,
        token
      }
    } catch (err) {
      throw CustomError.internalServer(`${ err }`)
    }
  }

  loginUser = async ( loginUserDto ) => {
    const usuario = await UserModel.findOne({ email: loginUserDto.email })
    if ( !usuario ) throw CustomError.badRequest('User already exixts')

    // valid password
    const validPassword = BcryptAdapter.compare(loginUserDto.password, usuario.password)
    if ( !validPassword ) throw CustomError.badRequest('Passowrd not valid')

    const {password, ...usuarioEntity} = UserEntity.fromObject(usuario)

    // generart jwt
    const token = await JwtAdapter.generateJWT({id: usuario.id, name: usuario.name})
    if ( !token ) throw CustomError.badRequest('Error while creating JWT')

    return {
      ok: true,
      user: usuarioEntity,
      token
    }
  }

  validarToken = async (req) => {
    const {id, name} = req
    if ( !id || !name ) throw CustomError.anauthorized('id and name not in token')

    // generar jwt
    const newToken = await JwtAdapter.generateJWT({id: id, name: name})

    return {
      ok: true,
      id, name,
      newToken
    }
  }
}
