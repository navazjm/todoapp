import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as dotenv from "dotenv";
import * as middlewares from "./middlewares";
import api from "./api";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "*",
    optionsSuccessStatus: 200
};

app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
