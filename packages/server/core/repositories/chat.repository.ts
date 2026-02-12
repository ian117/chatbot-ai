import type { Message } from "../entities/message.entity.ts";

export interface IChatRepository {
    saveMessage(message: Message): Promise<void>;
}
