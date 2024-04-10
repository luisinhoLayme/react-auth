import express from 'express'
import cors from 'cors'

export class Server {

  #app = express()
  #publicPath
  #routes
  #port

  constructor(obj = {}) {
    const { port, routes, publicPath = 'public' } = obj
    this.#port = port
    this.#publicPath = publicPath
    this.#routes = routes
  }

  async start() {
    // cors
    this.#app.use(cors())

    //
    this.#app.use( express.json() )
    this.#app.use( express.urlencoded({ extended: true }) )

    // Directorio public
    this.#app.use( express.static(this.#publicPath) )

    // Rutas
    this.#app.use( this.#routes )

    // port
    this.#app.listen(this.#port, () => {
      console.log(`Servidor corriendo en puerto ${ this.#port }`);
    })
  }
}



