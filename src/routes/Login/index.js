import express from 'express';
import {
  getLoginById,
  getLoginByUser,
  createLogin,
  updateLogin,
} from '../../controllers/Login.js';

const LoginRoute = express.Router();

/**
 * Get a specific login record by ID.
 * @route GET /login/:id_login
 * @param {string} id_login - Unique ID of the login.
 */
LoginRoute.get('/:id_login', getLoginById);

/**
 * Get a specific login record by user name.
 * @route GET /login/user/:user_login
 * @param {string} user_login - User name of the login.
 */
LoginRoute.get('/user/:user_login', getLoginByUser);

/**
 * Create a new login record.
 * @route POST /login
 */
LoginRoute.post('/', createLogin);

/**
 * Update a login record by ID.
 * @route PUT /login/:id_login
 * @param {string} id_login - Unique ID of the login to update.
 */
LoginRoute.put('/:id_login', updateLogin);

export default LoginRoute;
