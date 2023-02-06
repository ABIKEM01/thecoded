import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
import UserRoute from "./routes/usersRoute.js";
import { connectDB } from "./config/db.js";
import colors from "colors";

//setup cors permission
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("welcome to the coded backend");
});

app.use("/api/v1/users", UserRoute);


//home route

//page not found
app.all("*", async (req, res) => {
  try {
    res.status(404);
    throw new Error("Sorry, no endpoint found");
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
});

const start = async (port) => {
  try {
    const conn = await connectDB();
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("server is running".bgCyan);
    });

    console.log(
      `Database is up and running on ${conn.connection.host}`.bgGreen.underline
    );
  } catch (err) {
    console.log(`${err}`.bgRed.underline);
  }
};

const PORT = process.env.PORT || 4000;
4000;

start(PORT);
