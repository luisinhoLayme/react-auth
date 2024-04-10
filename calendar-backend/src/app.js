import 'dotenv/config'
import { Server } from './presentation/server.js'
import { AppRoutes } from './presentation/routes.js'
import { MongoDatabase } from './data/mongo/mongo-database.js'


const main = async () => {

  await MongoDatabase.connect({
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME
  })

  const server = new Server({
    port: process.env.PORT ?? 4000,
    publicParh: process.env.PUBLIC_PATH,
    routes: AppRoutes.routes
  })

  server.start()
}

(() => {
  main()
})()

