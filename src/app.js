import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "./dbs/init.mongodb.js";
import router from "./routes/index.js";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// db
// checkOverload();

// init router
app.use("/", router);

// handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export default app;
