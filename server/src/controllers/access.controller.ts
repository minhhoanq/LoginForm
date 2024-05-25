import { NextFunction, Request, Response } from "express";
import { Created, SuccessResponse } from "../core/success.response";
import { AccessService } from "../services/access.service";
import { AccessRepository } from "../repositories/access.repo";
import { SessionRepository } from "../repositories/session.repo";

const accessService = new AccessService(
    new AccessRepository(),
    new SessionRepository()
);

class AccessController {
    signUp = async (req: Request, res: Response, next: NextFunction) => {
        new Created({
            message: "Sign up successfully",
            metadata: await accessService.signUp(
                req.body,
                req.ip,
                req.headers["user-agent"]
            ),
        }).send(res);
    };

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Sign in successfully",
            metadata: await accessService.signIn(
                req.body,
                req.ip,
                req.headers["user-agent"]
            ),
        }).send(res);
    };

    signOut = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Sign out successfully",
            metadata: await accessService.signOut(req.session),
        }).send(res);
    };

    refreshTokenUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        new SuccessResponse({
            message: "Sign out successfully",
            metadata: await accessService.refreshTokenUser(
                req.user,
                req.refreshToken as string,
                req.session,
                req.headers["user-agent"],
                req.ip
            ),
        }).send(res);
    };
}

export default new AccessController();
