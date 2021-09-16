import { api } from "../api";
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POST,
  UPDATE_POST,
} from "./blog.constants";

export const fetchPosts = (dispatch) => async () => {
  try {
    dispatch({ type: FETCH_POST.PENDING });
    const { data } = await api.get("/posts");
    dispatch({ type: FETCH_POST.SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FETCH_POST.ERROR, payload: error.response });
  }
};

export const addBlogPost = (dispatch) => async (title, content, cb) => {
  try {
    dispatch({ type: CREATE_POST.PENDING });
    const { data } = await api.post("/posts", { title, content });
    console.log(data);
    dispatch({ type: CREATE_POST.SUCCESS, payload: data });
    if (cb) {
      cb();
    }
  } catch (error) {
    dispatch({ type: CREATE_POST.ERROR, payload: error.response });
  }
};
export const removeBlogPost = (dispatch) => async (id) => {
  try {
    dispatch({ type: DELETE_POST.PENDING });
    await api.delete(`/posts/${id}`);
    dispatch({ type: DELETE_POST.SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_POST.ERROR, payload: error.response });
  }
};
export const editBlogPost = (dispatch) => async (id, title, content, cb) => {
  try {
    dispatch({ type: UPDATE_POST.PENDING });
    const { data } = await api.patch(`/posts/${id}`, { title, content });
    dispatch({ type: UPDATE_POST.SUCCESS, payload: data });
    if (cb) {
      cb();
    }
  } catch (error) {
    dispatch({ type: UPDATE_POST.ERROR, payload: error.response });
  }
};
