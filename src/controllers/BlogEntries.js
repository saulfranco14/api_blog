import BlogEntries from "../models/BlogEntries.js";
import { handleSqlError } from "../utils/handleError.js";

/**
 * Creates a new blog entry.
 *
 * @param {object} req - Express request object containing blog entry data in the body.
 * @param {object} res - Express response object.
*/
export const createBlogEntry = async (req, res) => {
  const {
    title_blog_entries,
    content_blog_entries,
    id_user,
  } = req.body;

  try {

    const publication_blog_entries = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const newBlogEntry = new BlogEntries(
      title_blog_entries,
      content_blog_entries,
      publication_blog_entries,
      1,
      id_user
    );

    await newBlogEntry.save();
    res.status(201).json({ message: "Blog entry successfully created" });
  } catch (error) {
    console.error("Error while creating blog entry:", error);
    handleSqlError(error, res);
  }
};

/**
 * Enables or disables a blog entry.
 *
 * @param {object} req - Express request object with id_blog_entries as a parameter and the new active status in the body.
 * @param {object} res - Express response object.
*/
export const enableDisableBlogEntry = async (req, res) => {
  const { id_blog_entries } = req.params;
  const { active_blog_entries } = req.body;

  try {
    await BlogEntries.enableDisable(id_blog_entries, active_blog_entries);
    res.json({
      message: `Blog entry ${
        active_blog_entries ? "enabled" : "disabled"
      } successfully`,
    });
  } catch (error) {
    console.error("Error while updating blog entry status:", error);
    handleSqlError(error, res);
  }
};
