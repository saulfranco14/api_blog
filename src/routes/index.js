import express from "express";
import LoginRoute from "./Login/index.js";
import BlogEntriesRoute from "./BlogEntries/index.js";
import UserRoute from "./User/index.js";

const router = express.Router();

router.use("/login", LoginRoute);
router.use("/blog-entries", BlogEntriesRoute);
router.use("/user", UserRoute);

export default router;
