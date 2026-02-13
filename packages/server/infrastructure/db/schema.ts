import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const conversationsTable = pgTable('conversations', {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
        .references(() => usersTable.id, { onDelete: 'cascade' })
        .notNull(),

    title: text('title').notNull().default('New Chat'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
    return {
        userIdIdx: index('user_id_idx').on(table.userId),
    };
});

// --- TABLA DE MENSAJES ---
export const messagesTable = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),

    // FK: Si borras el chat, se borran los mensajes (cascade)
    conversationId: uuid('conversation_id')
        .references(() => conversationsTable.id, { onDelete: 'cascade' })
        .notNull(),

    role: text('role', { enum: ['system', 'user', 'assistant'] }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        conversationIdx: index('conversation_idx').on(table.conversationId),
    };
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    conversations: many(conversationsTable),
}));

export const conversationsRelations = relations(conversationsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [conversationsTable.userId],
        references: [usersTable.id],
    }),
    messages: many(messagesTable),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
    conversation: one(conversationsTable, {
        fields: [messagesTable.conversationId],
        references: [conversationsTable.id],
    }),
}));