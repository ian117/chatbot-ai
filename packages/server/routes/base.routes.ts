import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.get("/api/message", (req: Request, res: Response) => {
    res.json({ message: "This is the note I was suposse to write" });
});

export default router;
