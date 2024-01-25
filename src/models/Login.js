import db from "../config/db.js";
import {
  getLoginByIdQuery,
  getLoginByUserQuery,
  insertLoginQuery,
  updateLoginQuery,
  updateUserTokenQuery
} from "../sql/LoginQueries.js";
import { hashPassword } from "../utils/bcrypt.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class Login {
  constructor(
    user_login,
    password_login,
    token_login = null,
    active_login = 1,
    id_role,
    last_login = null
  ) {
    this.user_login = user_login;
    this.password_login = password_login;
    this.token_login = token_login;
    this.active_login = active_login;
    this.id_role = id_role;
    this.last_login = last_login;
  }

  static async getByUser(user_login) {
    try {
      const [results] = await db.query(getLoginByUserQuery, [user_login]);
      return results;
    } catch (error) {
      console.error("Error al obtener el login por usuario:", error);
      throw error;
    }
  }

  static async authenticate(user_login, password) {
    try {
      const [users] = await db.query(getLoginByUserQuery, [user_login]);
      if (users.length === 0) {
        const error = new Error("Usuario no encontrado");
        error.code = "USER_NOT_FOUND";
        throw error;
      }

      const user = users[0];

      const passwordIsValid = await bcrypt.compare(
        password,
        user.password_login
      );

      if (!passwordIsValid) {
        const error = new Error("Contraseña incorrecta");
        error.code = "INCORRECT_PASSWORD";
        throw error;
      }
      const token = jwt.sign(
        { id: user.id_login, user_login: user.user_login },
        process.env.JWT_SECRET,
        {
          expiresIn: 7200,
        }
      );

      return token;
    } catch (error) {
      console.error("Error en la autenticación:", error);
      throw error;
    }
  }

  async save() {
    if (!this.user_login || !this.password_login || !this.id_role)
      throw new Error("Datos requeridos no proporcionados.");

    const hashedPassword = await hashPassword(this.password_login);

    try {
      await db.query(insertLoginQuery, [
        this.user_login,
        hashedPassword,
        this.token_login,
        this.active_login,
        this.id_role,
        this.last_login,
      ]);
    } catch (error) {
      console.error("Error al guardar el login:", error);
      throw error;
    }
  }

  static async updateUserToken(id_login, newToken) {
    if (!id_login || !newToken) throw new Error("ID de login y token son requeridos.");

    try {
      await db.query(updateUserTokenQuery, [ 
        newToken, 
        id_login, 
      ]);
    } catch (error) {
      console.error("Error al actualizar el token del usuario:", error);
      throw error;
    }
  }
}

export default Login;
