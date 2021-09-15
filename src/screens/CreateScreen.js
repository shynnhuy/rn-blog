import React from "react";
import { PostForm } from "../components/PostForm";
import { useBlogPosts } from "../context/BlogContext";

export const CreateScreen = ({ navigation: { navigate } }) => {
  const { addBlogPost } = useBlogPosts();

  const createPost = (title, content) => {
    if (!title || !content) return;

    addBlogPost(title, content, () => {
      navigate("Index");
    });
  };

  return <PostForm submitBtn="Add" onSubmit={createPost} />;
};