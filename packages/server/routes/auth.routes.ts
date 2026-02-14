import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { authInit } from "../lib/auth-init.ts";

const router = Router();

router.all("/auth/{*path}", toNodeHandler(authInit));

export default router;
