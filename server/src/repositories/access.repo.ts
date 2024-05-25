import { PrismaClient } from "@prisma/client";
import { IAccessRepository } from "../interfaces/access.interface";

export class AccessRepository implements IAccessRepository {
    _prisma: PrismaClient;
    constructor() {
        this._prisma = new PrismaClient();
    }

    async findUserByEmail(email: string) {
        const userExists = await this._prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return userExists;
    }

    async createUser(data: any): Promise<any> {
        const { email, hashedPassword, firstName, lastName } = data;
        return await this._prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                roleId: 1,
            },
        });
    }

    async findFirst(data: any): Promise<any> {
        const { email, clientAgent, clientIp } = data;
        return await this._prisma.session.findFirst({
            where: {
                email: email,
                clientAgent: clientAgent,
                clientIp: clientIp,
            },
        });
    }
}
