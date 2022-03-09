import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.MongoURL || "";

mongoose.connect(dbUrl);
