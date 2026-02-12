export interface IChatRepository {
    saveMessage(message: any): Promise<void>;
}

export class MockChatRepository implements IChatRepository {
    async saveMessage(message: any): Promise<void> {
        console.log("MockChatRepository: Saving message to DB...", message);
        // Here we would implement the actual DB logic
    }
}
