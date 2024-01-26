import express from "express";
import {
  createBlogEntry,
  enableDisableBlogEntry,
  getAllBlogEntries,
  getBlogEntriesByLogin,
} from "../../controllers/BlogEntries.js";

const BlogEntriesRoute = express.Router();

/**
 * Get all blog entries.
 * @route GET /blog-entries
 */
BlogEntriesRoute.get("/", getAllBlogEntries);

/**
 * Get blog entries by user login.
 * @route GET /blog-entries/user/:id_login
 * @param {string} id_login - Identifier of the user to retrieve blog entries for.
 */
BlogEntriesRoute.get("/user/:id_login", getBlogEntriesByLogin);

/**
 * Create a new blog entry.
 * @route POST /blog-entries
 */
BlogEntriesRoute.post("/", createBlogEntry);

/**
 * Enable or disable a blog entry.
 * @route PUT /blog-entries/:id_blog_entries
 * @param {string} id_blog_entries - Unique ID of the blog entry to update.
 */
BlogEntriesRoute.put("/:id_blog_entries", enableDisableBlogEntry);

export default BlogEntriesRoute;
