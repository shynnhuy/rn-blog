import { useContext } from "react";
import {
  fetchPosts,
  addBlogPost,
  editBlogPost,
  removeBlogPost,
} from "./blog.actions";
import { blogReducer } from "./blog.reducer";
import { createDataContext } from "./createDataContext";

const initialState = { loading: false, error: null, posts: [] };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { fetchPosts, addBlogPost, removeBlogPost, editBlogPost },
  initialState
);

export const useBlogPosts = () => useContext(Context);
