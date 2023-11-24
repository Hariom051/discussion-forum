import { CommentModel } from "../models/comment-model.js";
import mongoose from "mongoose";
export const commentService = {
  async commentOnPost(comment) {
    try {
      const doc = await CommentModel.create(comment);
      return doc;
    } catch (err) {
      throw err;
    }
  },
  async getAllCommentsofPost(slug) {
    try {
      // const docs = await CommentModel.find({ "post-slug": slug }).sort({
      //   createdAt: -1,
      // });
      const docs = await CommentModel.find({ "post-slug": slug })
        .populate({
          path: "author",
          model: "User",
          select: { _id: 0, name: 1 },
        })
        .sort({ createdAt: -1 })
        .select("-_id comment-content createdAt updatedAt author")
        .lean();

      return docs;
    } catch (err) {
      throw err;
    }
  },
};
