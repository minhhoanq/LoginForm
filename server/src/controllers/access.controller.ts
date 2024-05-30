import { NextFunction, Request, Response } from "express";
import { Created, SuccessResponse } from "../core/success.response";
import { AccessService } from "../services/access.service";
import { AccessRepository } from "../repositories/access.repo";
import { SessionRepository } from "../repositories/session.repo";
import { RequestValidator } from "../utils/request.validator";
import { Login } from "../dtos/user.dto";

const accessService = new AccessService(
    new AccessRepository(),
    new SessionRepository()
);

class AccessController {
    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, firstName, lastName } = req.body;
        const data = {
            email: email.trim(),
            password: password.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        };

        new Created({
            message: "Sign up successfully",
            metadata: await accessService.signUp(data),
        }).send(res);
    };

    finalSignup = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        new Created({
            message: "Sign up successfully",
            metadata: await accessService.finalSignup(
                req.body,
                req.headers["user-agent"],
                req.ip
            ),
        }).send(res);
    };

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const data = {
            email: email.trim(),
            password: password.trim(),
        };

        new SuccessResponse({
            message: "Sign in successfully",
            metadata: await accessService.signIn(
                data,
                req.ip,
                req.headers["user-agent"],
                res
            ),
        }).send(res);
    };

    signOut = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Sign out successfully",
            metadata: await accessService.signOut(req.session, res),
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

    getUserByAt = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Get me successfully",
            metadata: await accessService.getUserByAt(
                req.headers["authorization"] as string,
                req.headers["x-client-email"] as string,
                req.headers["user-agent"] as string,
                req.ip as string
            ),
        }).send(res);
    };

    forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { email } = req.body;
        const data = {
            email: email.trim(),
        };
        new SuccessResponse({
            message: "Regenarate password successfully!",
            metadata: await accessService.forgotPassword(data),
        }).send(res);
    };

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { password, tokenPassword } = req.body;

        const data = {
            password: password.trim(),
            tokenPassword: tokenPassword.trim(),
        };

        new SuccessResponse({
            message: "Regenarate password successfully!",
            metadata: await accessService.resetPassword(data),
        }).send(res);
    };
}

export default new AccessController();
