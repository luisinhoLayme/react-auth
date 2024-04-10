import { Router } from 'express'
import { AuthController } from './controller.js'
import { AuthService } from '../services/auth.js'
import { RoutesMiddleware } from '../middleware/routes.middleware.js'

export class AuthRoutes {
  static get routes() {
    const router = Router()
    const authService = new AuthService()
    const authController = new AuthController(authService)

    router.post('/new', authController.crearUsuario)
    router.post('/', authController.loginUsuario)
    router.get('/renew', RoutesMiddleware.validateJWT, authController.revalidarToken)

    return router
  }
}



