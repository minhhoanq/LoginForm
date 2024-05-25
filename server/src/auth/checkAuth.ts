import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthFailureError } from "../core/error.response";
import { ISessionRepository } from "../interfaces/session.interface";
import Jwt from "jsonwebtoken";

const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-client-id",
    CLIENT_EMAIL: "x-client-email",
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken",
};

export interface AccessTokenData {
    userId: number;
    roleId: number;
    email: string;
}

export interface RefreshTokenData {
    userId: number;
    roleId: number;
    email: string;
}

export class auth {
    private _sessionRepo: ISessionRepository;
    constructor(sessionRepo: ISessionRepository) {
        this._sessionRepo = sessionRepo;
    }

    authentication = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const userEmail = req.headers[HEADER.CLIENT_EMAIL] as string;
            const clientAgent = req.headers["user-agent"];
            const clientIp = req.ip;

            if (!userEmail)
                return res.json(new AuthFailureError(`Invalid client`));

            const payload = {
                email: userEmail,
                clientAgent: clientAgent,
                clientIp: clientIp,
            };

            const session = await this._sessionRepo.findFirstSession(payload);

            if (req.headers[HEADER.REFRESHTOKEN]) {
                const refreshToken = req.get(HEADER.REFRESHTOKEN) as string;
                try {
                    const decodeUser = await (<RefreshTokenData>(
                        Jwt.verify(refreshToken as string, session.privateKey)
                    ));

                    if (userEmail !== decodeUser.email) {
                        return res.json(new Error("Invalid user email"));
                    }
                    req.session = session;
                    req.user = decodeUser;
                    req.refreshToken = refreshToken as string;
                    return next();
                } catch (error) {
                    return res.json(new Error("error"));
                }
            }

            const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
            if (!accessToken) {
                return res.json(new Error("Access token not found"));
            }
            try {
                const decodeUser = await (<AccessTokenData>(
                    Jwt.verify(accessToken as string, session.publicKey)
                ));

                if (userEmail !== decodeUser.email)
                    return res.json(new Error("User email not found"));
                req.session = session;
                req.user = decodeUser;

                return next();
            } catch (error) {
                return res.json(new Error("error"));
            }
        }
    );
}
