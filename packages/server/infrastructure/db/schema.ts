import { pgTable, uuid, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const sessionTable = pgTable("session", {
    id: uuid("id").primaryKey().defaultRandom(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
        .notNull()
        // FK: Si borras el user, se borran las sesiones (cascade)
        .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const accountTable = pgTable("account", {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
        .notNull()
        // FK: Si borras el user, se borran las cuentas (cascade)
        .references(() => usersTable.id, { onDelete: 'cascade' }),

    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export const conversationsTable = pgTable('conversations', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        // FK: Si borras el user, se borran los mensajes (cascade)
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

export const messagesTable = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    conversationId: uuid('conversation_id')
        // FK: Si borras el chat, se borran los mensajes (cascade)
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
    sessions: many(sessionTable),
    accounts: many(accountTable),
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