import { type Request, type Response, type NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { authInit } from "../lib/auth-init.ts";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await authInit.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        res.locals.session = session.session;
        res.locals.user = session.user;

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
};
