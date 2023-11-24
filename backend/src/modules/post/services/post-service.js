import { PostModel } from "../models/post-model.js";

export const postService = {
  async createPost(post) {
    try {
      const doc = await PostModel.create(post);
      return doc;
    } catch (err) {
      throw err;
    }
  },

  async getAllPost() {
    try {
      const allPost = await PostModel.find({})
        .populate({
          path: "author",
          model: "User",
          select: { _id: 0, name: 1 },
        })
        .sort({ createdAt: -1 })
        .select("-_id title text slug createdAt updatedAt author")
        .lean();

      return allPost;
    } catch (err) {
      throw err;
    }
  },

  async getAPostBySlug(slug) {
    try {
      const post = await PostModel.findOne({ slug: slug }).exec();
      return post;
    } catch (err) {
      throw err;
    }
  },
};
