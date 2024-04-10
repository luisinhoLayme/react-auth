import { Router } from 'express'
import { AuthRoutes } from './auth/routes.js'
import { EventRoutes } from './events/routes.js'

export class AppRoutes {

  static get routes() {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/event', EventRoutes.routes)

    return router
  }
}
