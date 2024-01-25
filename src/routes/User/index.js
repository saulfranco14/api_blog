import express from "express";
import {
  createUser,
  getUserByLogin,
  updateUser,
} from "../../controllers/User.js";

const UserRoute = express.Router();

/**
 * Create a new user.
 * @route POST /user
 */
UserRoute.post("/", createUser);

/**
 * Retrieve a user by their login ID.
 * @route GET /user/login/:id_login
 * @param {string} id_login - Unique login ID of the user.
 */
UserRoute.get("/login/:id_login", getUserByLogin);

/**
 * Update a user by their user ID.
 * @route PUT /user/:id_user
 * @param {string} id_user - Unique ID of the user to update.
 */
UserRoute.put("/:id_user", updateUser);

export default UserRoute;
