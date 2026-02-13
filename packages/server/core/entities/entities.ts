// 1. User: Actualizado para Better-Auth
export interface User {
    id: string;             // UUID
    email: string;
    name: string;           // Better-Auth suele requerirlo (notNull en DB)
    image: string | null;   // Estandarizado: Antes 'avatarUrl', ahora 'image'
    emailVerified: boolean; // Vital para AppSec: ¿Es un usuario real?

    createdAt: Date;
    updatedAt: Date;        // Requerido por la librería para manejo de sesión
}

// 2. Conversation: El contexto del chat
export interface Conversation {
    id: string;
    userId: string;         // Relación: Propietario
    title: string;          // Ej: "Debugging React Hooks"

    createdAt: Date;
    updatedAt: Date;        // Vital para ordenar el Sidebar (LRU - Least Recently Used)
}

// 3. Message: El contenido
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
    id: string;
    conversationId: string; // Relación: Pertenencia
    role: MessageRole;
    content: string;        // El texto del mensaje (o JSON stringified si usas tools)

    createdAt: Date;
}

// --- ENTIDADES DE SOPORTE (Opcional, pero útil para tipado estricto en el Frontend) ---

// 4. Session: Lo que recibirás en el frontend con useSession()
export interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// 5. Account: Vinculación con proveedores OAuth (Google, GitHub, etc.)
export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | null;
    refreshTokenExpiresAt?: Date | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// 6. Verification: Para tokens de email, etc.
export interface Verification {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}