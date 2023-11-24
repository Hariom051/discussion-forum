import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema(
  {
    "comment-content": { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    "post-slug": {
      type: mongoose.Schema.Types.String,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);
export const CommentModel = mongoose.model("Comment", commentSchema);
