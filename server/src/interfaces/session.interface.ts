import { UpdateSession } from "../dtos/session.dto";

export interface ISessionRepository {
    createSession(data: any): Promise<any>;
    findFirstSession(data: any): Promise<any>;
    updateSession(data: UpdateSession): Promise<UpdateSession>;
    deleteSessionById(sessionId: number): Promise<any>;
}
