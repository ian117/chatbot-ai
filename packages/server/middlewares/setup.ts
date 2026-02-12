import express from "express";
import type { Express } from "express";

export function setupGlobalMiddlewares(app: Express) {
    // Body parser
    app.use(express.json());

    // Future middlewares (cors, helmet, morgan, etc.) can be added here
    // app.use(cors());
    // app.use(helmet());
}
