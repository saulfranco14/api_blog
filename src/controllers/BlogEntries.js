import BlogEntries from "../models/BlogEntries.js";
import User from "../models/User.js";
import { handleSqlError } from "../utils/handleError.js";

/**
 * Retrieves all blog entries.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const getAllBlogEntries = async (req, res) => {
  try {
    const entries = await BlogEntries.all();
    res.json(entries);
  } catch (error) {
    console.error("Error while getting all blog entries:", error);
    handleSqlError(error, res);
  }
};

/**
 * Retrieves blog entries for a specific user.
 *
 * @param {object} req - Express request object with id_login as a parameter.
 * @param {object} res - Express response object.
 */
export const getBlogEntriesByLogin = async (req, res) => {
  const { id_login } = req.params;

  try {
    const entries = await BlogEntries.getByLogin(id_login);
    res.json(entries);
  } catch (error) {
    console.error("Error while getting blog entries by login:", error);
    handleSqlError(error, res);
  }
};

/**
 * Creates a new blog entry.
 *
 * @param {object} req - Express request object containing blog entry data in the body.
 * @param {object} res - Express response object.
 */
export const createBlogEntry = async (req, res) => {
  const { title_blog_entries, content_blog_entries, id_login } = req.body;

  try {
    const publication_blog_entries = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const user = await User.getByLogin(id_login);

    if (!user) return res.status(404).json({ message: "User not found" });

    const newBlogEntry = new BlogEntries(
      title_blog_entries,
      content_blog_entries,
      publication_blog_entries,
      1,
      user.id
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
