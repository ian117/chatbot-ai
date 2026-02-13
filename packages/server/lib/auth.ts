import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../infrastructure/db/index.ts"
import { accountTable, sessionTable, usersTable, verificationTable } from "../infrastructure/db/schema.ts";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: usersTable,
            session: sessionTable,
            account: accountTable,
            verification: verificationTable,
        }
    }),
    advanced: {
        database: {
            generateId: "uuid", //We use postgres, so gen_random_uuid() is used
        }
    },
    emailAndPassword: {
        enabled: true
    }
});