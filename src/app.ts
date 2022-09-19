
import "./mongo.config";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes";
import express from "express";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/", router);

app.get('/',(req,res)=>{
  res.status(200).json('Welcome')
})

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to database", err);
});

const port = process.env.PORT || 9000

mongoose.connection.on("connected", (err, res) => {
  console.log("Database Connected");
  console.log(process.env.MONGOURL,'mongourl',process.env.SECRETKEY);
  
  app.listen(port, () => {
    console.log("APP Listening to port 9000");
  });
});
