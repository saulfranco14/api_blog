import db from "../config/db.js";
import {
  getUserByLoginQuery,
  insertUserQuery,
  updateUserQuery,
} from "../sql/UserQueries.js";

class User {
  constructor(
    name_user,
    last_name_user,
    sur_name_user,
    phone_user,
    email_user,
    active_user,
    id_login
  ) {
    this.name_user = name_user;
    this.last_name_user = last_name_user;
    this.sur_name_user = sur_name_user;
    this.phone_user = phone_user;
    this.email_user = email_user;
    this.active_user = active_user;
    this.id_login = id_login;
  }

  async save() {
    try {
      await db.query(insertUserQuery, [
        this.name_user,
        this.last_name_user,
        this.sur_name_user,
        this.phone_user,
        this.email_user,
        this.active_user,
        this.id_login,
      ]);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      throw error;
    }
  }

  static async getByLogin(id_login) {
    try {
      const [results] = await db.query(getUserByLoginQuery, [id_login]);
      return results;
    } catch (error) {
      console.error("Error al obtener el usuario por ID de login:", error);
      throw error;
    }
  }

  async updateLogin(
    name_user,
    last_name_user,
    sur_name_user,
    phone_user,
    email_user,
    active_user,
    newIdLogin
  ) {
    try {
      await db.query(updateUserQuery, [
        name_user,
        last_name_user,
        sur_name_user,
        phone_user,
        email_user,
        active_user,
        newIdLogin,
        this.id_user,
      ]);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }
}

export default User;
