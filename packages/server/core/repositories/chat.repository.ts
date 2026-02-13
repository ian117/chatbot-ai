import type { Message } from "../entities/entities.ts";

export interface IChatRepository {
    saveMessage(message: Message): Promise<void>;
}
