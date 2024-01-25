import express from "express";
import {
  createLogin,
  authenticateUser,
  verifyUserToken,
} from "../../controllers/Login.js";

const LoginRoute = express.Router();

/**
 * Create a new login record.
 * @route POST /login
 */
LoginRoute.post("/", createLogin);

/**
 * Create a new token
 * @route POST /login/authenticate
 */
LoginRoute.post("/authenticate", authenticateUser);

/**
 * Verifies a JWT token and returns the user's data if the token is valid..
 * @route GET /login/verify-token
 */
LoginRoute.get("/verify-token", verifyUserToken);

export default LoginRoute;
