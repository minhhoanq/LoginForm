import express, { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import accessController from "../../controllers/access.controller";

import { SessionRepository } from "../../repositories/session.repo";
import { auth } from "../../auth/checkAuth";
import passport from "passport";

const authen = new auth(new SessionRepository());

const router = express.Router();

//google sign up
router.get("/google/sign-in/success", (req: Request, res: Response) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "successfully",
            user: req.user,
        });
    }
});

router.get("/google/sign-in/failed", (req: Request, res: Response) => {
    return res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/google/sign-out", (req: Request, res: Response) => {
    res.redirect(`${process.env.CLIENT_URL}`);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}`,
        // successReturnToOrRedirect: "/api/v1/auth/google/sign-in/success",
        failureRedirect: "/api/v1/auth/google/sign-in/failed",
    })
);
//

router.post("/sign-up", asyncHandler(accessController.signUp));
router.post("/final-sign-up", asyncHandler(accessController.finalSignup));
router.post("/sign-in", asyncHandler(accessController.signIn));

router.post(
    "/sign-out",
    authen.authentication,
    asyncHandler(accessController.signOut)
);

router.post(
    "/refresh-token",
    authen.authentication,
    asyncHandler(accessController.refreshTokenUser)
);

router.get("/me", asyncHandler(accessController.getUserByAt));

export default router;
