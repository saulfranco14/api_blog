import User from "../models/User.js";
import { handleSqlError } from "../utils/handleError.js";

/**
 * Creates a new user.
 *
 * @param {object} req - Express request object containing user data in the body.
 * @param {object} res - Express response object.
 */
export const createUser = async (req, res) => {
  const {
    name_user,
    last_name_user,
    sur_name_user,
    phone_user,
    email_user,
    active_user,
    id_login,
  } = req.body;

  try {
    const newUser = new User(
      name_user,
      last_name_user,
      sur_name_user,
      phone_user,
      email_user,
      active_user,
      id_login
    );

    await newUser.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error("Error while creating user:", error);
    handleSqlError(error, res);
  }
};

/**
 * Retrieves a user record by login ID.
 *
 * @param {object} req - Express request object with id_login as a parameter.
 * @param {object} res - Express response object.
 */
export const getUserByLogin = async (req, res) => {
  const { id_login } = req.params;

  try {
    const user = await User.getByLogin(id_login);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error while retrieving user by login ID:", error);
    handleSqlError(error, res);
  }
};

/**
 * Updates a user record by its ID.
 *
 * @param {object} req - Express request object with id_user as a parameter and user data in the body.
 * @param {object} res - Express response object.
 */
export const updateUser = async (req, res) => {
  const { id_user } = req.params;
  const {
    name_user,
    last_name_user,
    sur_name_user,
    phone_user,
    email_user,
    active_user,
    id_login,
  } = req.body;

  try {
    const userToUpdate = new User(
      name_user,
      last_name_user,
      sur_name_user,
      phone_user,
      email_user,
      active_user,
      id_login
    );
    userToUpdate.id_user = id_user;
    await userToUpdate.update();
    res.json({ message: "User successfully updated", id_user });
  } catch (error) {
    console.error("Error while updating user:", error);
    handleSqlError(error, res);
  }
};
