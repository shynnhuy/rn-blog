import React from "react";
import { PostForm } from "../components/PostForm";
import { useBlogPosts } from "../context/BlogContext";

export const EditScreen = ({ route: { params }, navigation: { pop } }) => {
  const { state, editBlogPost } = useBlogPosts();
  const { id } = params;

  const post = state.find((item) => item.id === id);

  const editPost = (title, content) => {
    if (!title || !content) return;

    editBlogPost(id, title, content, () => pop());
  };

  return (
    <PostForm
      title={post.title}
      content={post.content}
      submitBtn="Edit"
      onSubmit={editPost}
    />
  );
};
