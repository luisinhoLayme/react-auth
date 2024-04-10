import { request, response } from 'express'
import { CustomError, LoginUsuarioDto, RegistrarUsuarioDto } from '../../domain/index.js'


export class AuthController {

  constructor(authService){
    this.authService = authService
  }

  #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ok: false, error: error.message})
    }

    console.log(`${ error }`)
    return res.status(500).json({ error: 'Internal server error tolk to admin' })
  }

  crearUsuario = async (req = request, res = response) => {
    const [error, registrarUsuarioDto] = RegistrarUsuarioDto.create(req.body)
    if (error) return res.status(400).json({ ok: false, error })

    this.authService.registerUser(registrarUsuarioDto)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.#handleError(error, res))
  }

  loginUsuario = async (req = request, res = response) => {
    const [error, loginUsuarioDto] = LoginUsuarioDto.create(req.body)
    if (error) return res.status(400).json({ ok: false, error })

    this.authService.loginUser(loginUsuarioDto)
      .then((user) => res.json(user))
      .catch((error) => this.#handleError(error, res))
  }

  revalidarToken = async (req, res = response) => {

    this.authService.validarToken(req)
      .then((payload) => res.json(payload))
      .catch((error) => this.#handleError(error, res))
  }
}





