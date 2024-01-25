import express from "express";
import LoginRoute from "./Login/index.js";
import BlogEntries from "./BlogEntries/index.js";

const router = express.Router();

router.use("/login", LoginRoute);
router.use("/blog-entries", BlogEntries);

export default router;
