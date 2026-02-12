import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes.ts";
import baseRoutes from "./routes/base.routes.ts";
import { setupGlobalMiddlewares } from "./middlewares/setup.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Setup Middlewares
setupGlobalMiddlewares(app);

// Setup Routes
app.use(baseRoutes);
app.use("/api", chatRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});