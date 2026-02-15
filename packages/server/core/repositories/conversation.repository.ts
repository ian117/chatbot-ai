import type { Conversation, Message, MessageRole } from "../entities/entities.ts";

export interface IConversationRepository {
    createConversation(userId: string, title?: string): Promise<Conversation>;
    getConversations(userId: string): Promise<Conversation[]>;
    getConversationById(id: string, userId: string): Promise<Conversation | null>;
    deleteConversation(id: string, userId: string): Promise<void>;

    addMessage(conversationId: string, role: MessageRole, content: string): Promise<Message>;
    getMessages(conversationId: string): Promise<Message[]>;
}
