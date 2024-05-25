import { Login, Register } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import crypto from "crypto";
import JWT from "jsonwebtoken";
import { IAccessRepository } from "../interfaces/access.interface";
import { ISessionRepository } from "../interfaces/session.interface";

export class AccessService {
    private _accessRepo: IAccessRepository;
    private _sessionRepo: ISessionRepository;
    constructor(
        accessRepo: IAccessRepository,
        sessionRepo: ISessionRepository
    ) {
        this._accessRepo = accessRepo;
        this._sessionRepo = sessionRepo;
    }

    async hasdData(data: any) {
        return await bcrypt.hash(data, 10);
    }

    async validateData(input: any, data: any) {
        return await bcrypt.compare(input, data);
    }

    async createTokenPair(
        userId: number,
        roleId: number,
        email: string,
        publicKey: string,
        privateKey: string
    ) {
        const payload = { userId, roleId, email };
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days",
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async signUp(data: Register, clientIp: any, clientAgent: any) {
        console.log(data);
        const { email, password, firstName, lastName } = data;
        const userExists = await this._accessRepo.findUserByEmail(email);
        if (userExists) {
            throw new Error("User already exists");
        }
        const hashedPassword = await this.hasdData(password);
        const newUser = await this._accessRepo.createUser({
            email,
            hashedPassword,
            firstName,
            lastName,
        });

        if (newUser) {
            const publicKey = crypto.randomBytes(64).toString("hex");
            const privateKey = crypto.randomBytes(64).toString("hex");

            const tokens = await this.createTokenPair(
                newUser.id,
                newUser.roleId,
                newUser.email,
                publicKey,
                privateKey
            );

            const session = await this._sessionRepo.createSession({
                email: newUser.email,
                publicKey: publicKey,
                privateKey: privateKey,
                clientAgent: clientAgent,
                clientIp: clientIp,
                expiredAt: 604800,
                refreshToken: tokens.refreshToken,
            });

            if (!session) {
                throw new Error("Unable to create session");
            }

            return {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
                tokens,
            };
        }

        return null;
    }

    async signIn(user: Login, clientIp: any, clientAgent: any) {
        const userExists = await this._accessRepo.findUserByEmail(user.email);

        if (!userExists) {
            throw new Error("User already exists");
        }
        const match = await this.validateData(
            user.password,
            userExists.password
        );
        if (!match) throw new Error("Invalid password!");

        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const tokens = await this.createTokenPair(
            userExists.id,
            userExists.roleId,
            userExists.email,
            publicKey,
            privateKey
        );

        const sessionExists = await this._sessionRepo.findFirstSession({
            email: userExists.email,
            clientAgent,
            clientIp,
        });

        let session;
        if (sessionExists) {
            session = await this._sessionRepo.updateSession({
                sessionId: sessionExists.id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken,
            });
        } else {
            session = await this._sessionRepo.createSession({
                email: userExists.email,
                publicKey: publicKey,
                privateKey: privateKey,
                clientAgent: clientAgent,
                clientIp: clientIp,
                expiredAt: 604800,
                refreshToken: tokens.refreshToken,
            });
        }

        if (!session) throw new Error("Error: session");

        return {
            user: {
                id: userExists.id,
                email: userExists.email,
            },
            tokens,
        };
    }

    async signOut(session: any) {
        const delSession = await this._sessionRepo.deleteSessionById(
            session.id
        );
        console.log(delSession);
        if (delSession) {
            return true;
        }
        return false;
    }

    async refreshTokenUser(
        user: any,
        refreshToken: string,
        session: any,
        clientAgent: any,
        clientIp: any
    ) {
        const { user_id, email, role_id } = user;
        if (session.refreshToken !== refreshToken) {
            throw new Error("Invalid refresh token!");
        }

        const userExists = await this._accessRepo.findUserByEmail(email);

        if (!userExists) throw new Error("User not registered");
        const tokens = await this.createTokenPair(
            user_id,
            role_id,
            email,
            session.publicKey,
            session.privateKey
        );

        const sessionExists = await this._sessionRepo.findFirstSession({
            email: userExists.email,
            clientAgent: clientAgent,
            clientIp: clientIp,
        });

        // await this._prisma.session.update({
        //     where: {
        //         id: sessionExists?.id,
        //     },
        //     data: {
        //         expiredAt: 604800,
        //         refreshToken: tokens.refreshToken,
        //     },
        // });

        await this._sessionRepo.updateSession({
            sessionId: sessionExists?.id,
            expiredAt: 604800,
            refreshToken: tokens.refreshToken,
        });

        const result = {
            user_id: userExists.id,
            email: userExists.email,
        };

        return {
            user: result,
            tokens,
        };
    }

    async getSessionUser(
        email: string,
        clientAgent: any,
        clientIp: any
    ): Promise<any> {
        return await this._accessRepo.findFirst({
            email: email,
            clientAgent: clientAgent,
            clientIp: clientIp,
        });
    }
}
