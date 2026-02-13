import type { IChatRepository } from "../../core/repositories/chat.repository.ts";
import type { Message } from "../../core/entities/message.entity.ts";

// Implementacion de chat repository
// Aqui guardar el mensaje, chat y todo eso

export class MockChatRepository implements IChatRepository {
    async saveMessage(message: Message): Promise<void> {
        console.log("MockChatRepository: Saving message to DB...", message);
        // Here we would implement the actual DB logic
    }
}
