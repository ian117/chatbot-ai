import { type User, type Session } from "../core/entities/entities.ts";

declare global {
    namespace Express {
        interface Locals {
            user: User;
            session: Session;
        }
    }
}