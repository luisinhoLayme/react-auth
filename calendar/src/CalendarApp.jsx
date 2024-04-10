import { Provider } from 'react-redux'
// import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"
import { HashRouter } from 'react-router-dom'

const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <HashRouter future={{ v7_startTransition: true }}>
        <AppRouter />
      </HashRouter>
    </Provider>
  )
}

export default CalendarApp
