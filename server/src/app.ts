import express, { Express, NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
// app.use(cookieParser());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/", routes);

// handling error
app.use((_req, _res, next) => {
    const error = new Error("Not found") as any;
    error.status = 404;
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        status: error.status || "error",
        reasonStatuscode: `error ${statusCode}`,
        message: error.message || "Server error",
    });
});

export default app;
