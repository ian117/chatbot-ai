import type { IConversationRepository } from "../core/repositories/conversation.repository.ts";
import type { Conversation, Message, MessageRole } from "../core/entities/entities.ts";

export class ConversationService {
    constructor(private readonly conversationRepository: IConversationRepository) { }

    async createConversation(userId: string, title?: string): Promise<Conversation> {
        return await this.conversationRepository.createConversation(userId, title);
    }

    async getConversations(userId: string): Promise<Conversation[]> {
        return await this.conversationRepository.getConversations(userId);
    }

    async getConversation(id: string, userId: string): Promise<Conversation | null> {
        return await this.conversationRepository.getConversationById(id, userId);
    }

    async deleteConversation(id: string, userId: string): Promise<void> {
        return await this.conversationRepository.deleteConversation(id, userId);
    }

    async addMessage(conversationId: string, userId: string, role: MessageRole, content: string): Promise<Message> {
        const conversation = await this.getConversation(conversationId, userId);
        if (!conversation) {
            throw new Error("Conversation not found and access denied");
        }

        return await this.conversationRepository.addMessage(conversationId, role, content);
    }

    async getMessages(conversationId: string, userId: string): Promise<Message[]> {
        const conversation = await this.getConversation(conversationId, userId);
        if (!conversation) {
            throw new Error("Conversation not found and access denied");
        }

        return await this.conversationRepository.getMessages(conversationId);
    }
}
