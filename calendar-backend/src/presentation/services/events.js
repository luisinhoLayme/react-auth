import { EventModel } from "../../data/mongo/models/event.model.js"
import { CustomError } from "../../domain/index.js"

export class EventService {
  constructor() {}

  getEventos = async () => {
    const events = await EventModel.find().populate('user', 'name')
    if ( !events ) throw CustomError.badRequest('No hay eventos')

    return {
      ok: true,
      events
    }
  }

  crearEvento = async(eventDto) => {
    try {
      const evento = new EventModel( eventDto )
      evento.user = eventDto.idUser
      const eventoGuardado = await evento.save()
      return {
        ok: true,
        evento: eventoGuardado
      }
    } catch (err) {
      throw CustomError.internalServer(`${ err }`)
    }
  }

  actualizarEvento = async(eventDto) => {
    const eventId = eventDto.eventId
    const userId = eventDto.idUser

    const evento = await EventModel.findById( eventId )
    if (!evento) throw CustomError.noFound('Evento no existe por es id')

    if( evento.user.toString() !== userId ) throw CustomError.anauthorized('No tiene privilegio de editar este evento')

    try {
      const eventoActualizado = await EventModel.findByIdAndUpdate(eventId, eventDto, { new: true })
      return {
        ok: true,
        evento: eventoActualizado
      }
    } catch (err) {
      throw CustomError.internalServer(`${ err }`)
    }
  }

  eliminarEvento = async({ eventId, userId }) => {
    const evento = await EventModel.findById( eventId )
    if (!evento) throw CustomError.noFound('Evento no existe por es id')

    if( evento.user.toString() !== userId ) throw CustomError.anauthorized('No tiene privilegio de editar este evento')

    try {
      const eventoEliminado = await EventModel.findByIdAndDelete(eventId)
      return {
        ok: true,
        eventoEliminado
      }
    } catch (err) {
      throw CustomError.internalServer(`${ err }`)
    }
  }
}
