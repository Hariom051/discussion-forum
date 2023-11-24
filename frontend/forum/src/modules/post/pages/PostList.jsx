import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/post-slice";
import { Typography } from "@mui/material";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  return (
    <div>
      {post.posts?.length === 0 && (
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          OOPS!! There is no post Found
        </Typography>
      )}
      {post.loading
        ? "Loading..."
        : post.posts?.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default PostList;
