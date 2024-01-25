import express from "express";
import LoginRoute from "./Login/index.js";

const router = express.Router();

router.use("/login", LoginRoute);

export default router;
