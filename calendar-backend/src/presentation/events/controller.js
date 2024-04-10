import { response } from "express";
import { CustomError, EventDto } from "../../domain/index.js";


export class EventController {

  constructor(eventService) {
    this.eventService = eventService
  }

  #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ok: false, error: error.message})
    }

    console.log(`${ error }`)
    return res.status(500).json({ error: 'Internal server error tolk to admin' })
  }

  getEventos = async(req, res = response) => {
    this.eventService.getEventos()
      .then((event) => res.json(event))
      .catch((error) => this.#handleError(error, res))
  }

  crearEvento = (req, res = response) => {
    const [error, eventDto] = EventDto.create({ ...req.body, idUser: req.id })
    if (error) return res.status(400).json({ ok: false, error })

    this.eventService.crearEvento(eventDto)
      .then((event) => res.json(event))
      .catch((error) => this.#handleError(error, res))
  }

  actualizarEvento = (req, res = response) => {
    const eventId = req.params.id
    const [error, eventDto] = EventDto.create({ ...req.body, idUser: req.id, eventId })
    if (error) return res.status(400).json({ ok: false, error })

    this.eventService.actualizarEvento(eventDto)
      .then((event) => res.json(event))
      .catch((error) => this.#handleError(error, res))
  }

  eliminarEvento = (req, res = response) => {
    const eventId = req.params.id
    const userId = req.id

    this.eventService.eliminarEvento({ eventId, userId })
      .then((event) => res.json(event))
      .catch((error) => this.#handleError(error, res))
  }
}
