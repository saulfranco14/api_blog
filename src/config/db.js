import mysql from "mysql2/promise";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const dbConfig = {
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  port: process.env.PORT_DB
};

const db = mysql.createPool(dbConfig);

try {
  console.log("Success OK");
} catch (error) {
  console.error("Error al establecer la conexión a la base de datos:", error);
}

export default db;
