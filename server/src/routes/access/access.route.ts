import express, { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import accessController from "../../controllers/access.controller";

import { SessionRepository } from "../../repositories/session.repo";
import { auth } from "../../auth/checkAuth";

const authen = new auth(new SessionRepository());

const router = express.Router();

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
