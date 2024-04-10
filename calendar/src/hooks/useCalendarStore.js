import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const {
    events,
    activeEvent
  } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    // llegar al backend
    try {
      // todo update event
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return;
      }
      // Creando
      const { data } = await calendarApi.post('/event', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

    } catch (err) {
      console.log(err)
      Swal.fire('Error al guardar', err.response.data.error, 'error')
    }

  }

  const startDeletingEvent = async () => {
    // llegar al backen
    try {
      //eliminando
      await calendarApi.delete(`/event/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (err) {
      console.log(err)
      Swal.fire('Error al eliminar', err.response.data.error, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/event')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (err) {
      console.log('Error cargando eventos')
      console.log(err)
    }
  }


  return {
    //
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}


