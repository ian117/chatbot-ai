import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';

export const messagesTable = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    conversationId: uuid('conversation_id').notNull(),
    role: text('role', { enum: ['system', 'user', 'assistant'] }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        // Index for fast conversation lookup
        conversationIdx: index('conversation_idx').on(table.conversationId),
    };
});
