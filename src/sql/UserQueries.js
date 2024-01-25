/**
 * Query to insert a new User record into the database.
 * @param {string} name_user - The name of the user.
 * @param {string} last_name_user - The last name of the user.
 * @param {string} sur_name_user - The surname of the user.
 * @param {string} phone_user - The phone number of the user.
 * @param {string} email_user - The email address of the user.
 * @param {number} active_user - The active status of the user (1 for active).
 * @param {number} id_login - The login ID associated with the user.
 * @returns {object} The result of the insert operation.
 */
export const insertUserQuery = `
    INSERT INTO User 
        (
            name_user, 
            last_name_user, 
            sur_name_user, 
            phone_user, 
            email_user, 
            active_user, 
            id_login
        ) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?);
`;

/**
 * Query to get a User record by the login ID.
 * @param {number} id_login - The login ID associated with the user.
 * @returns {object} A user record with all fields from the database.
 */
export const getUserByLoginQuery = `
    SELECT 
        id_user, 
        created_at, 
        updated_at, 
        name_user, 
        last_name_user, 
        sur_name_user, 
        phone_user, 
        email_user, 
        active_user, 
        id_login 
    FROM 
        User 
    WHERE 
        id_login = ?;
`;

/**
 * Query to update an existing User record by its user ID.
 * @param {string} name_user - The updated name of the user.
 * @param {string} last_name_user - The updated last name of the user.
 * @param {string} sur_name_user - The updated surname of the user.
 * @param {string} phone_user - The updated phone number of the user.
 * @param {string} email_user - The updated email address of the user.
 * @param {number} active_user - The updated active status of the user.
 * @param {number} id_login - The updated login ID for the user.
 * @param {number} id_user - The unique identifier of the user record to update.
 * @returns {object} The result of the update operation.
 */
export const updateUserQuery = `
    UPDATE User 
    SET 
        name_user = ?, 
        last_name_user = ?, 
        sur_name_user = ?, 
        phone_user = ?, 
        email_user = ?, 
        active_user = ?, 
        id_login = ?, 
        updated_at = NOW()
    WHERE 
        id_user = ?;
`;
