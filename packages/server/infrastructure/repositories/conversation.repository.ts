import { eq, and, desc } from "drizzle-orm";
import db from "../db/index.ts";
import { conversationsTable, messagesTable } from "../db/schema.ts";
import type { IConversationRepository } from "../../core/repositories/conversation.repository.ts";
import type { Conversation, Message, MessageRole } from "../../core/entities/entities.ts";

export class ConversationRepository implements IConversationRepository {
    async createConversation(userId: string, title: string = "New Chat"): Promise<Conversation> {
        const [conversation] = await db.insert(conversationsTable)
            .values({
                userId,
                title,
            })
            .returning();

        return conversation as Conversation;
    }

    async getConversations(userId: string): Promise<Conversation[]> {
        return await db.select()
            .from(conversationsTable)
            .where(eq(conversationsTable.userId, userId))
            .orderBy(desc(conversationsTable.updatedAt));
    }

    /**
     * Retrieves a conversation by ID.
     * @warning This method must remain lightweight. Do not add heavy joins or deep populations here.
     * It is used frequently for security checks. Create a separate method for detailed views.
     */
    async getConversationById(id: string, userId: string): Promise<Conversation | null> {
        const [conversation] = await db.select()
            .from(conversationsTable)
            .where(and(
                eq(conversationsTable.id, id),
                eq(conversationsTable.userId, userId)
            ));

        return conversation ? (conversation as Conversation) : null;
    }

    async deleteConversation(id: string, userId: string): Promise<void> {
        await db.delete(conversationsTable)
            .where(and(
                eq(conversationsTable.id, id),
                eq(conversationsTable.userId, userId)
            ));
    }

    async addMessage(conversationId: string, role: MessageRole, content: string): Promise<Message> {
        return await db.transaction(async (tx) => {
            // Ejecutamos ambas promesas en paralelo
            const [insertResult, _updateResult] = await Promise.all([
                // 1. Insertar el mensaje
                tx.insert(messagesTable)
                    .values({ conversationId, role, content })
                    .returning(),

                // 2. Actualizar updatedAt del chat
                tx.update(conversationsTable)
                    .set({ updatedAt: new Date() })
                    .where(eq(conversationsTable.id, conversationId))
            ]);

            // Desestructuramos el resultado del insert (que viene dentro de un array)
            const message = insertResult[0];

            return message as Message;
        });
    }

    async getMessages(conversationId: string): Promise<Message[]> {
        return await db.select()
            .from(messagesTable)
            .where(eq(messagesTable.conversationId, conversationId))
            .orderBy(messagesTable.createdAt);
    }
}
