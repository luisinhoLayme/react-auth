import { createSlice } from '@reduxjs/toolkit'


// import { addHours } from 'date-fns'
// const temEvent = {
//   _id: new Date().getTime(),
//   title: 'Hppy Birth day',
//   notes: 'Buy hotkaky',
//   start: new Date(),
//   end: addHours( new Date(), 2 ),
//   bgColor: '#f2f2f2',
//   user: {
//     _id: '123',
//     name: 'Luisinho'
//   }
// }


const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push( payload )
      state.activeEvent = null
    },
    onUpdateEvent: ( state, {payload} ) => {
      state.events = state.events.map(event => {
        if (event.id === payload.id) {
          return payload
        }
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, {payload = []}) => {
      state.isLoadingEvents = false
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id)
        if (!exists) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar :(state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
    }
  }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions
