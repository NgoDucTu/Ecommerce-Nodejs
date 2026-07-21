import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// db
checkOverload();

// init router
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello",
  });
});

export default app;
