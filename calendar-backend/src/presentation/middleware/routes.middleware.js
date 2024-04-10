import { response } from "express"
import { JwtAdapter } from "../../config/index.js"


export class RoutesMiddleware {

  static validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token')
    if ( !token ) return res.status(401).json({ok: false, error: 'No hay token en la peticion'})

    try {
      const payload = await JwtAdapter.validateJwt( token )
      if (!payload) return res.status(401).json({ok: false, error: 'Invalid token' })

      req.id = payload.id
      req.name = payload.name

      next()
    } catch (err) {
      console.log(err)
      return res.status(500).json({ ok: false, error: 'Internal server error' })
    }

  }
}
