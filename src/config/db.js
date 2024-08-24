import mongoose from "mongoose";
// import { global } from "styled-jsx/css";


const connectDB = process.env.MONGODB_URI

if(!connectDB){
    throw new Error('Please Define Coonection String')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  
  async function connectToDatabase() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(connectDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
  
  export default connectToDatabase;