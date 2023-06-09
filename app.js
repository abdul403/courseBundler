import express from "express";
import { config } from "dotenv";
import { ErrorMiddleware } from "./middlewares/Error.js";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

const app = express();

// using middilewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

//importing routes
import courses from "./routes/courseRoutes.js";
import users from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import otherRoute from "./routes/otherRoutes.js";

app.use("/api/v1", courses);
app.use("/api/v1", users);
app.use("/api/v1", payment);
app.use("/api/v1", otherRoute);

export default app;

app.use(ErrorMiddleware);
