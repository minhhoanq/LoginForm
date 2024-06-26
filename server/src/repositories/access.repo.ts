import { PrismaClient } from "@prisma/client";
import { IAccessRepository } from "../interfaces/access.interface";
import { Update, findFirst } from "../dtos/user.dto";

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

    async findUser(data: findFirst): Promise<any> {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            status,
            isVerify,
            passwordChangedAt,
            passwordResetToken,
            passwordResetExpires,
        } = data;
        console.log("expired: " + passwordResetExpires);
        return await this._prisma.user.findFirst({
            where: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                status: status,
                isVerify: isVerify,
                passwordChangedAt: passwordChangedAt,
                passwordResetToken: passwordResetToken,
                passwordResetExpires: {
                    gt: passwordResetExpires,
                },
            },
        });
    }

    async deleteUserByEmail(email: string): Promise<any> {
        return await this._prisma.user.delete({
            where: {
                email: email,
            },
        });
    }

    async findUserByCodeVerify(code: string): Promise<any> {
        console.log("codeRepo:" + code);
        return await this._prisma.user.findFirst({
            where: {
                email: {
                    endsWith: `${code}`,
                },
            },
        });
    }

    async updateUserEmail(email: string, id: number): Promise<any> {
        return await this._prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
            },
        });
    }

    async updateUser(data: Update): Promise<any> {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            status,
            isVerify,
            passwordChangedAt,
            passwordResetToken,
            passwordResetExpires,
        } = data;

        console.log(
            id + "\n" + passwordResetToken + "\n" + passwordResetExpires
        );

        return await this._prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                status: status,
                isVerify: isVerify,
                passwordChangedAt: passwordChangedAt,
                passwordResetToken: passwordResetToken,
                passwordResetExpires: passwordResetExpires,
            },
        });
    }
}
