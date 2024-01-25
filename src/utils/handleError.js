import SqlErrorCodes from "./sqlErrorCodes.js";

export const handleSqlError = (error, res) => {
  console.log("error->", error);

  switch (error.code) {
    case SqlErrorCodes.DUPLICATE_ENTRY:
      return res.status(409).json({ message: "User conflicts" });
    case SqlErrorCodes.FOREIGN_KEY_CONSTRAINT_FAILS:
      return res.status(400).json({ message: "Foreign key constraint fails" });
    case SqlErrorCodes.SYNTAX_ERROR:
      return res.status(400).json({ message: "Syntax error in SQL query" });
    case "USER_NOT_FOUND":
    case "INCORRECT_PASSWORD":
    case SqlErrorCodes.INVALID_TOKEN:
      return res.status(401).json({ message: "Not authentication" });
    default:
      return res.status(500).json({ message: "Internal Server Error" });
  }
};
