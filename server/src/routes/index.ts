import express from "express";
import accessRoute from "./access/access.route";

const router = express.Router();

router.use("/api/v1/auth", accessRoute);

export default router;
