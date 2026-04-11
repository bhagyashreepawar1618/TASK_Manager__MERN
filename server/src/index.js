import connectDB from "./database/index.js";
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server is listening to port ", process.env.PORT);
    });

    app.get("/", (req, res) => {
      res.send("<h1>Hello dear user</h1>");
    });
  })
  .catch((err) => {
    console.log("DB connection Failed.!!");
  });

mongoose.connection.on("connected", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});
