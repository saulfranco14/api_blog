import Login from "../models/Login.js";

/**
 * Retrieves a login record by its ID.
 *
 * @param {object} req - Express request object with id_login as a parameter.
 * @param {object} res - Express response object.
 */
export const getLoginById = async (req, res) => {
  const { id_login } = req.params;
  try {
    const login = await Login.getById(id_login);
    if (!login) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.json({ login });
  } catch (error) {
    console.error("Error while retrieving the login:", error);
    res.status(500).json({ error: "Error while retrieving the login" });
  }
};

/**
 * Retrieves a login record by username.
 *
 * @param {object} req - Express request object with user_login as a parameter.
 * @param {object} res - Express response object.
 */
export const getLoginByUser = async (req, res) => {
  const { user_login } = req.params;
  try {
    const login = await Login.getByUser(user_login);
    if (!login) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.json({ login });
  } catch (error) {
    console.error("Error while retrieving login by username:", error);
    res.status(500).json({ error: "Error while retrieving login by username" });
  }
};

/**
 * Creates a new login record.
 *
 * @param {object} req - Express request object containing login data in the body.
 * @param {object} res - Express response object.
 */
export const createLogin = async (req, res) => {
  const { user_login, password_login, token_login, active_login, id_role } =
    req.body;
  try {
    const newLogin = new Login(user_login, password_login, null, 1, id_role);
    await newLogin.save();
    res.status(201).json({ message: "Login successfully created", newLogin });
  } catch (error) {
    console.error("Error while creating login:", error);
    res.status(500).json({ error: "Error while creating login" });
  }
};

/**
 * Updates a login record by its ID.
 *
 * @param {object} req - Express request object with id_login as a parameter and login data in the body.
 * @param {object} res - Express response object.
 */
export const updateLogin = async (req, res) => {
  const { id_login } = req.params;
  const { user_login, password_login, token_login, active_login, id_role } =
    req.body;
  try {
    const loginToUpdate = new Login(
      id_login,
      user_login,
      password_login,
      token_login,
      active_login,
      id_role
    );
    await loginToUpdate.updateById();
    res.json({ message: "Login successfully updated", id_login });
  } catch (error) {
    console.error("Error while updating login:", error);
    res.status(500).json({ error: "Error while updating login" });
  }
};
