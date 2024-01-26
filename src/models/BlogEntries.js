import db from "../config/db.js";
import {
   insertBlogEntryQuery,
   updateBlogEntryActiveStatusQuery,
   getAllBlogEntriesQuery,
   getBlogEntryByLoginQuery
  } from "../sql/BlogEntriesQueries.js";

class BlogEntries {
  constructor(
    title_blog_entries,
    content_blog_entries,
    publication_blog_entries,
    active_blog_entries = 1,
    id_user,
  ) {
    this.title_blog_entries = title_blog_entries;
    this.content_blog_entries = content_blog_entries;
    this.publication_blog_entries = publication_blog_entries;
    this.active_blog_entries = active_blog_entries;
    this.id_user = id_user;
  }

  static async all() {
    try {
      const result = await db.query(getAllBlogEntriesQuery);
      return result[0];
    } catch (error) {
      console.error("Error al obtener todas las entradas del blog:", error);
      throw error;
    }
  }

  static async getByLogin(id_login) {
    try {
      const result = await db.query(getBlogEntryByLoginQuery, [id_login]);
      return result[0]; 
    } catch (error) {
      console.error("Error al obtener la entrada del blog por login:", error);
      throw error;
    }
  }

  async save() {
    try {
      await db.query(insertBlogEntryQuery, [
        this.title_blog_entries,
        this.content_blog_entries,
        this.publication_blog_entries,
        this.active_blog_entries,
        this.id_user,
      ]);
    } catch (error) {
      console.error("Error al guardar la entrada del blog:", error);
      throw error;
    }
  }

  static async enableDisable(id_blog_entries, active) {
    try {
      await db.query(updateBlogEntryActiveStatusQuery, [active, id_blog_entries]);
    } catch (error) {
      console.error(
        "Error al actualizar el estado de la entrada del blog:",
        error
      );
      throw error;
    }
  }
}

export default BlogEntries;
