import { CodeVerify, Login, Register } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import crypto from "crypto";
import JWT from "jsonwebtoken";
import { IAccessRepository } from "../interfaces/access.interface";
import { ISessionRepository } from "../interfaces/session.interface";
import { Response } from "express";
import {
    AuthFailureError,
    ConflictRequestError,
    Unauthorized,
} from "../core/error.response";
import { AccessTokenData } from "../auth/checkAuth";
import Jwt from "jsonwebtoken";
import makeVerification from "uniqid";
import sendMail from "../utils/sendMail";

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

    async signUp(data: Register) {
        const { email, password, firstName, lastName } = data;
        const userExists = await this._accessRepo.findUserByEmail(email);
        console.log("cehcek");
        if (userExists) {
            throw new ConflictRequestError("User already exists");
        }
        const hashedPassword = await this.hasdData(password);

        const verificationCode = makeVerification();

        const emailEdited = btoa(email) + "@" + verificationCode;

        const newUser = await this._accessRepo.createUser({
            email: emailEdited,
            hashedPassword,
            firstName,
            lastName,
        });

        if (newUser) {
            const html = `<h2>Mã xác nhận đăng ký tài khoản của bạn là:</h2> 
                            <br/><blockquote>${verificationCode}</blockquote>
                            <h4>Vui lòng không chia sẻ mã này cho bất kỳ ai, hoặc app, website không phải của chúng tôi!</h4>
                            <h4>Cảm ơn và chúc bạn trải nghiệm dịch vụ vui vẻ <3</h4>`;
            const data = {
                email,
                html,
                subject: "Register with email!",
            };

            await sendMail(data);
        }

        // setTimeout(async () => {
        //     await this._accessRepo.deleteUserByEmail(emailEdited);
        // }, 15 * 1000);

        return 1;
    }

    async finalSignup(verifyCode: CodeVerify, clientAgent: any, clientIp: any) {
        const code = verifyCode.code;
        console.log("verifyCode:" + verifyCode);

        const userExist = await this._accessRepo.findUserByCodeVerify(code);

        if (userExist) {
            userExist.email = atob(userExist.email.split("@")[0]);
            console.log(userExist.email, userExist.id);
            const updateUser = await this._accessRepo.updateUserEmail(
                userExist.email,
                userExist.id
            );

            if (updateUser) {
                const publicKey = crypto.randomBytes(64).toString("hex");
                const privateKey = crypto.randomBytes(64).toString("hex");

                const tokens = await this.createTokenPair(
                    updateUser.id,
                    updateUser.roleId,
                    updateUser.email,
                    publicKey,
                    privateKey
                );

                const session = await this._sessionRepo.createSession({
                    email: updateUser.email,
                    publicKey: publicKey,
                    privateKey: privateKey,
                    clientAgent: clientAgent,
                    clientIp: clientIp,
                    expiredAt: 604800,
                    refreshToken: tokens.refreshToken,
                });

                if (!session) {
                    throw new Unauthorized("Unable to create session");
                }

                return {
                    user: {
                        id: updateUser.id,
                        email: updateUser.email,
                        firstName: updateUser.firstName,
                        lastName: updateUser.lastName,
                    },
                    tokens: {
                        accessToken: tokens.accessToken,
                    },
                };
            }

            return updateUser;
        }

        return null;
    }

    async signIn(user: Login, clientIp: any, clientAgent: any, res: Response) {
        const userExists = await this._accessRepo.findUserByEmail(user.email);

        if (!userExists) {
            throw new Unauthorized("User not found");
        }
        const match = await this.validateData(
            user.password,
            userExists.password
        );
        if (!match) throw new Unauthorized("Invalid password!");

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

        if (!session) throw new Unauthorized("Error: session");

        return {
            user: {
                id: userExists.id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
            },
            tokens: {
                accessToken: tokens.accessToken,
            },
        };
    }

    async signOut(session: any, res: Response) {
        const delSession = await this._sessionRepo.deleteSessionById(
            session.id
        );

        res.clearCookie("refreshToken");

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
        const { userId, email, roleId } = user;
        if (session.refreshToken !== refreshToken) {
            throw new Unauthorized("Invalid refresh token!");
        }

        const userExists = await this._accessRepo.findUserByEmail(email);

        if (!userExists) throw new Unauthorized("User not registered");
        const tokens = await this.createTokenPair(
            userId,
            roleId,
            email,
            session.publicKey,
            session.privateKey
        );

        const sessionExists = await this._sessionRepo.findFirstSession({
            email: userExists.email,
            clientAgent: clientAgent,
            clientIp: clientIp,
        });

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

    async getUserByAt(
        accessToken: string,
        userEmail: string,
        clientAgent: string,
        clientIp: string
    ) {
        if (!userEmail) throw new AuthFailureError(`Invalid client`);

        const payload = {
            email: userEmail,
            clientAgent: clientAgent,
            clientIp: clientIp,
        };

        const session = await this._sessionRepo.findFirstSession(payload);

        if (!accessToken) {
            throw new Unauthorized("Access token not found");
        }
        const decodeUser = await (<AccessTokenData>(
            Jwt.verify(accessToken as string, session.publicKey)
        ));

        if (userEmail !== decodeUser.email)
            throw new Unauthorized("User email not found");

        const user = await this._accessRepo.findUserByEmail(userEmail);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
