import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );

    console.log(
      `MOONGODB connected !! DB HOST : ${connectionInstance.connection.host}`,
    );
  } catch (e) {
    console.log("MONGODB connection failed ", e);
    process.exit(1);
  }
}

export default connectDB;
