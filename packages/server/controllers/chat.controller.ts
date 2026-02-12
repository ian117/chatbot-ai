import type { Request, Response } from "express";
import type { ChatService } from "../services/chat.service.ts";

export class ChatController {
    private chatService: ChatService;

    constructor(chatService: ChatService) {
        this.chatService = chatService;
    }

    async sendMessage(req: Request, res: Response) {
        try {
            const { messages } = req.body;
            if (!messages) {
                return res.status(400).json({ error: "Messages are required" });
            }

            const result = await this.chatService.generateResponse(messages);
            res.json({ content: result.text });
        } catch (error) {
            console.error("ChatController Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
