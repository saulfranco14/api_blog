/**
 * Query to insert a new BlogEntry record into the database.
 * @param {string} title_blog_entries - The title of the blog entry.
 * @param {string} content_blog_entries - The content of the blog entry.
 * @param {string} publication_blog_entries - The publication date and time of the blog entry.
 * @param {number} active_blog_entries - The active status of the blog entry (1 for active).
 * @param {number} id_user - The user ID associated with the blog entry.
 * @returns {object} The result of the insert operation.
 */
export const insertBlogEntryQuery = `
    INSERT INTO BlogEntries 
        (
            title_blog_entries, 
            content_blog_entries, 
            publication_blog_entries, 
            active_blog_entries, 
            id_user
        ) 
    VALUES 
        (?, ?, ?, ?, ?);
`;

/**
 * Query to update the active status of a BlogEntry record by its ID.
 * @param {number} active_blog_entries - The new active status of the blog entry (1 for active, 0 for inactive).
 * @param {number} id_blog_entries - The unique identifier of the blog entry record to update.
 * @returns {object} The result of the update operation.
 */
export const updateBlogEntryActiveStatusQuery = `
    UPDATE BlogEntries 
    SET 
        active_blog_entries = ?
    WHERE 
        id_blog_entries = ?;
`;

// Añadir estas consultas SQL
export const getAllBlogEntriesQuery = `
    SELECT  
        BlogEntries.title_blog_entries, 
        BlogEntries.content_blog_entries, 
        BlogEntries.publication_blog_entries, 
        BlogEntries.active_blog_entries, 
        BlogEntries.id_user,
        User.name_user
    FROM 
        BlogEntries 
    LEFT JOIN User ON BlogEntries.id_user = User.id_user
    WHERE 
        BlogEntries.active_blog_entries = 1;
    `;

export const getBlogEntryByLoginQuery = `
    SELECT  
        title_blog_entries, 
        content_blog_entries, 
        publication_blog_entries, 
        active_blog_entries, 
        id_user 
    FROM 
        BlogEntries 
    WHERE 
        id_user = ?;`;
