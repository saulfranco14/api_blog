import db from "../config/db.js";
import {
  getLoginByIdQuery,
  getLoginByUserQuery,
  insertLoginQuery,
  updateLoginQuery,
} from "../sql/LoginQueries.js";

class Login {
  constructor(
    user_login,
    password_login,
    id_role,
    token_login = null,
    active_login = 1
  ) {
    this.user_login = user_login;
    this.password_login = password_login;
    this.id_role = id_role;
    this.token_login = token_login;
    this.active_login = active_login;
  }

  static async getById(id_login) {
    try {
      const [results] = await db.query(getLoginByIdQuery, [id_login]);
      return results;
    } catch (error) {
      console.error("Error al obtener el login por ID:", error);
      throw error;
    }
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

  async save() {
    
    if (!this.user_login || !this.password_login || !this.id_role)
      throw new Error("Datos requeridos no proporcionados.");

    try {
      await db.query(insertLoginQuery, [
        this.user_login,
        this.password_login,
        this.token_login,
        this.active_login,
        this.id_role,
      ]);
    } catch (error) {
      console.error("Error al guardar el login:", error);
      throw error;
    }
  }

  async updateById(id_login) {
    if (!id_login) throw new Error("ID de login no proporcionado.");

    try {
      await db.query(updateLoginQuery, [
        this.user_login,
        this.password_login,
        this.token_login,
        this.active_login,
        this.id_role,
        id_login,
      ]);
    } catch (error) {
      console.error("Error al actualizar el login:", error);
      throw error;
    }
  }
}

export default Login;
