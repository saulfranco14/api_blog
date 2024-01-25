import express from "express";
import {
  createBlogEntry,
  enableDisableBlogEntry
} from "../../controllers/BlogEntries.js";

const BlogEntriesRoute = express.Router();

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
