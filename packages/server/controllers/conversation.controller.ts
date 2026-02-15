import type { Request, Response } from "express";
import type { ConversationService } from "../services/conversation.service.ts";
import type { MessageRole } from "../core/entities/entities.ts";

export class ConversationController {
    constructor(private readonly conversationService: ConversationService) { }

    create = async (req: Request, res: Response) => {
        try {
            const { title } = req.body;
            const userId = res.locals.user.id;

            const conversation = await this.conversationService.createConversation(userId, title);
            res.status(201).json(conversation);
        } catch (error) {
            console.error("Error creating conversation:", error);
            res.status(500).json({ message: "Failed to create conversation" });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user.id;
            const conversations = await this.conversationService.getConversations(userId);
            res.json(conversations);
        } catch (error) {
            console.error("Error fetching conversations:", error);
            res.status(500).json({ message: "Failed to fetch conversations" });
        }
    }

    private getConversationId(req: Request): string {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            throw new Error("Invalid conversation ID");
        }
        return id;
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const id = this.getConversationId(req);
            const userId = res.locals.user.id;

            // This will use the lightweight getConversation method
            const conversation = await this.conversationService.getConversation(id, userId);

            if (!conversation) {
                res.status(404).json({ message: "Conversation not found" });
                return;
            }

            res.json(conversation);
        } catch (error: any) {
            if (error.message === "Invalid conversation ID") {
                res.status(400).json({ message: "Invalid conversation ID" });
                return;
            }
            console.error("Error fetching conversation:", error);
            res.status(500).json({ message: "Failed to fetch conversation" });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = this.getConversationId(req);
            const userId = res.locals.user.id;

            await this.conversationService.deleteConversation(id, userId);
            res.status(204).send();
        } catch (error: any) {
            if (error.message === "Invalid conversation ID") {
                res.status(400).json({ message: "Invalid conversation ID" });
                return;
            }
            console.error("Error deleting conversation:", error);
            res.status(500).json({ message: "Failed to delete conversation" });
        }
    }

    addMessage = async (req: Request, res: Response) => {
        try {
            const id = this.getConversationId(req);
            const { content } = req.body;
            const userId = res.locals.user.id;

            if (!content) {
                res.status(400).json({ message: "Content is required" });
                return;
            }

            // Force role to "user" for manual message additions
            const message = await this.conversationService.addMessage(id, userId, "user", content);
            res.status(201).json(message);
        } catch (error: any) {
            if (error.message === "Invalid conversation ID") {
                res.status(400).json({ message: "Invalid conversation ID" });
                return;
            }
            if (error.message === "Conversation not found and access denied") {
                res.status(404).json({ message: "Conversation not found or access denied" });
                return;
            }
            console.error("Error adding message:", error);
            res.status(500).json({ message: "Failed to add message" });
        }
    }

    getMessages = async (req: Request, res: Response) => {
        try {
            const id = this.getConversationId(req);
            const userId = res.locals.user.id;

            const messages = await this.conversationService.getMessages(id, userId);
            res.json(messages);
        } catch (error: any) {
            if (error.message === "Invalid conversation ID") {
                res.status(400).json({ message: "Invalid conversation ID" });
                return;
            }
            if (error.message === "Conversation not found and access denied") {
                res.status(404).json({ message: "Conversation not found or access denied" });
                return;
            }
            console.error("Error fetching messages:", error);
            res.status(500).json({ message: "Failed to fetch messages" });
        }
    }
}
