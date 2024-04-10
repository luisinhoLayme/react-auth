import { Router } from 'express'
import { EventService } from '../services/events.js'
import { EventController } from './controller.js'
import { RoutesMiddleware } from '../middleware/routes.middleware.js'

export class EventRoutes {

  static get routes() {
    const router = Router()
    const eventService = new EventService()
    const eventController = new EventController(eventService)

    router.use( RoutesMiddleware.validateJWT)

    router.get('/', eventController.getEventos)
    router.post('/', eventController.crearEvento)
    router.put('/:id', eventController.actualizarEvento)
    router.delete('/:id', eventController.eliminarEvento)

    return router
  }
}
