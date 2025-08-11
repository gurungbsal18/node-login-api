import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./router/route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.port;
const mongodb = process.env.MONGODB_URI;

mongoose
  .connect(mongodb)
  .then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  })
  .catch(() => {
    console.log("MONGODB CONNECTION FAIL");
  });

app.listen(port, () => {
  console.log("SERVER STARTED AT PORT:", port);
});

app.use("/api", router);
