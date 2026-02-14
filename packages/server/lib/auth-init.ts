import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../infrastructure/db/index.ts"
import { accountTable, sessionTable, usersTable, verificationTable } from "../infrastructure/db/schema.ts";

export const authInit = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: usersTable,
            session: sessionTable,
            account: accountTable,
            verification: verificationTable,
        }
    }),
    trustedOrigins: [
        process.env.BETTER_AUTH_URL!,
        ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://localhost:5173"] : [])
    ],
    advanced: {
        disableOriginCheck: process.env.NODE_ENV === "development",
        database: {
            generateId: "uuid", //We use postgres, so gen_random_uuid() is used
        }
    },
    emailAndPassword: {
        enabled: true
    }
});