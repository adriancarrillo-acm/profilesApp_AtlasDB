const mongoose = require('mongoose')
let { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = async () => {
    const dbURL = process.env.uri;
    const connection = mongoose.connection;
    const collection = connection.collection('users');
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        dbName: 'test_appDB',
    }
    try {
      const conn = await mongoose.connect(dbURL, options)
      console.log('Connected to MongoDB Atlas!!!')
    } 
    catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
  
  module.exports = connectDB