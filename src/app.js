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

export default app;
