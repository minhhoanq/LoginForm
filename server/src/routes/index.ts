import express from "express";
import accessRoute from "./access/access.route";

const router = express.Router();

router.use("/api/v1/user", accessRoute);

export default router;
