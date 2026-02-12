import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import type { IChatRepository } from "../core/repositories/chat.repository.ts";

export class ChatService {
    private chatRepository: IChatRepository;

    constructor(chatRepository: IChatRepository) {
        this.chatRepository = chatRepository;
    }

    async generateResponse(messages: any[]) {
        // Save user message (mock)
        const lastMessage = messages[messages.length - 1];
        await this.chatRepository.saveMessage(lastMessage);

        const result = await generateText({
            model: google("gemini-2.0-flash-exp"),
            messages: messages,
        });

        // Save AI response (mock)
        await this.chatRepository.saveMessage({ role: "assistant", content: result.text });

        return result;
    }
}
