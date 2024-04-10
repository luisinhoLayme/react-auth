import mongoose from "mongoose";


export class MongoDatabase {

  static async connect(options = {}) {
    const { mongoUrl, dbName } = options

    try {

      await mongoose.connect(mongoUrl, {
        dbName: dbName
      })


      console.log('db online')
      return true

    } catch (err) {
      console.log('Mongo connection error');
      throw err;
    }
  }
}

