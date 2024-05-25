import express, { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import accessController from "../../controllers/access.controller";

const router = express.Router();

router.post("/sign-up", asyncHandler(accessController.signUp));
router.post("/sign-in", asyncHandler(accessController.signIn));

export default router;
