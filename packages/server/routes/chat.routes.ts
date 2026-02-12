import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.ts";
import { ChatService } from "../services/chat.service.ts";
import { MockChatRepository } from "../infrastructure/repositories/chat.repository.ts";

const router = Router();

// Dependency Injection Setup
const chatRepository = new MockChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

router.post("/chat", (req, res) => chatController.sendMessage(req, res));

export default router;
