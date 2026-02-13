// 1. User: Quien usa la app
export interface User {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
    createdAt: Date;
}

// 2. Conversation: Aqui se clasifican los Messages
export interface Conversation {
    id: string;
    userId: string;        // FK: Relación: Dueño del chat
    title: string;
    createdAt: Date;
    updatedAt: Date;       // Se ordenara en base a
}

// 3. Message: Los mensajes que se envian y reciben
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
    id: string;
    conversationId: string;   // FK: A que Conversation pertenece
    role: MessageRole;
    content: string;
    createdAt: Date;
}