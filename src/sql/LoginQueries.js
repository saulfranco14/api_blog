/**
 * Query to get a Login record by its ID.
 * @param {number} id_login - The unique identifier of the login record.
 * @returns {object} A login record with all fields from the database.
 */
export const getLoginByIdQuery = `
    SELECT 
        id_login, 
        created_at, 
        updated_login, 
        user_login, 
        password_login, 
        token_login, 
        last_login, 
        active_login, 
        id_role 
    FROM 
        Login 
    WHERE 
        id_login = ?;
`;

/**
 * Query to get a Login record by the username.
 * @param {string} user_login - The username associated with the login record.
 * @returns {object} A login record with selected fields from the database.
 */
export const getLoginByUserQuery = `
    SELECT 
        id_login, 
        user_login, 
        password_login, 
        token_login, 
        last_login, 
        active_login, 
        id_role 
    FROM 
        Login 
    WHERE 
        user_login = ?;
`;

/**
 * Query to insert a new Login record into the database.
 * @param {string} user_login - The username for the login.
 * @param {string} password_login - The password for the login.
 * @param {string} token_login - The token associated with the login.
 * @param {number} active_login - The active status of the login (1 for active).
 * @param {number} id_role - The role ID associated with the login.
 * @returns {object} The result of the insert operation.
 */
export const insertLoginQuery = `
    INSERT INTO Login 
        (user_login, password_login, token_login, active_login, id_role, last_login) 
    VALUES 
        (?, ?, ?, ?, ?, ?);
`;

/**
 * Query to update an existing Login record by its ID.
 * @param {string} user_login - The new username for the login.
 * @param {string} password_login - The new password for the login.
 * @param {string} token_login - The new token associated with the login.
 * @param {number} active_login - The new active status of the login.
 * @param {number} id_role - The new role ID associated with the login.
 * @param {number} id_login - The unique identifier of the login record to update.
 * @returns {object} The result of the update operation.
 */
export const updateLoginQuery = `
    UPDATE Login 
    SET 
        user_login = ?, 
        password_login = ?, 
        token_login = ?, 
        active_login = ?, 
        id_role = ? 
    WHERE 
        id_login = ?;
`;
