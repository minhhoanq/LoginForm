import { PrismaClient } from "@prisma/client";
import { ISessionRepository } from "../interfaces/session.interface";
import { UpdateSession } from "../dtos/session.dto";

export class SessionRepository implements ISessionRepository {
    _prisma: PrismaClient;
    constructor() {
        this._prisma = new PrismaClient();
    }

    async createSession(data: any): Promise<any> {
        const {
            email,
            publicKey,
            privateKey,
            clientAgent,
            clientIp,
            expiredAt,
            refreshToken,
        } = data;
        return await this._prisma.session.create({
            data: {
                email: email,
                publicKey: publicKey,
                privateKey: privateKey,
                clientAgent: clientAgent,
                clientIp: clientIp,
                expiredAt: expiredAt,
                refreshToken: refreshToken,
            },
        });
    }

    async findFirstSession(data: any): Promise<any> {
        const { email, clientAgent, clientIp } = data;
        return await this._prisma.session.findFirst({
            where: {
                email: email,
                clientAgent: clientAgent,
                clientIp: clientIp,
            },
        });
    }

    async updateSession(data: UpdateSession): Promise<any> {
        const { sessionId, publicKey, privateKey, refreshToken, expiredAt } =
            data;
        return await this._prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                publicKey: publicKey,
                privateKey: privateKey,
                expiredAt: expiredAt,
                refreshToken: refreshToken,
            },
        });
    }

    async deleteSessionById(sessionId: number): Promise<any> {
        return await this._prisma.session.delete({
            where: {
                id: sessionId,
            },
        });
    }
}
