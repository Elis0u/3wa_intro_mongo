import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.js";
import driverRouter from "./routes/driverRouter.js";
import teamRouter from "./routes/teamRouter.js";
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoDB = process.env.MONGO_URI

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to our API using mongo and express");
});

app.use('/', userRouter)
app.use('/', driverRouter)
app.use('/', teamRouter)

app.listen(port, () => console.log("Server is running on port" + " " + port));