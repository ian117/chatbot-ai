import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller.ts";
import { ConversationService } from "../services/conversation.service.ts";
import { ConversationRepository } from "../infrastructure/repositories/conversation.repository.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";

const router = Router();

// Dependency Injection
const conversationRepository = new ConversationRepository();
const conversationService = new ConversationService(conversationRepository);
const conversationController = new ConversationController(conversationService);

// Routes
// Apply auth middleware to all routes
router.use(requireAuth);

router.post("/", conversationController.create);
router.get("/", conversationController.getAll);
router.get("/:id", conversationController.getOne);
router.delete("/:id", conversationController.delete);

router.post("/:id/messages", conversationController.addMessage);
router.get("/:id/messages", conversationController.getMessages);

export default router;
