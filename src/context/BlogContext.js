import React from "react";
import { useContext } from "react";
import { api } from "../api";
import { createActionSet } from "../utils";
import { createDataContext } from "./createDataContext";

const initialState = { loading: false, error: null, posts: [] };

const FETCH_POST = createActionSet("FETCH_POST");
const CREATE_POST = createActionSet("CREATE_POST");

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST.PENDING: {
      console.log("FETCH START");
      return { ...state, loading: true };
    }
    case FETCH_POST.SUCCESS: {
      console.log("FETCH SUCCESS");
      return { ...state, loading: false, posts: payload };
    }
    case FETCH_POST.ERROR: {
      console.log(payload);
      return { ...state, loading: false, error: payload };
    }
    case CREATE_POST.PENDING:
      return { ...state, loading: true };
    case CREATE_POST.SUCCESS:
      return { ...state, loading: false, posts: [...state.posts, payload] };
    case CREATE_POST.ERROR:
      return { ...state, loading: false, error: payload };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case "EDIT_POST": {
      const { id, title, content } = payload;
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, title, content } : post
        ),
      };
    }
    default:
      return state;
  }
};

const fetchPosts = (dispatch) => async () => {
  try {
    dispatch({ type: FETCH_POST.PENDING });
    const { data } = await api.get("/posts");
    console.log(data);
    dispatch({ type: FETCH_POST.SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FETCH_POST.ERROR, payload: error });
  }
};

const addBlogPost = (dispatch) => async (title, content, cb) => {
  try {
    dispatch({ type: CREATE_POST.PENDING });
    const { data } = await api.post("/posts", { title, content });
    console.log(data);
    dispatch({ type: CREATE_POST.SUCCESS, payload: data });
    if (cb) {
      cb();
    }
  } catch (error) {
    dispatch({ type: CREATE_POST.ERROR, payload: error });
  }
};
const removeBlogPost = (dispatch) => (id) =>
  dispatch({ type: "REMOVE_POST", payload: id });
const editBlogPost = (dispatch) => (id, title, content, cb) => {
  dispatch({ type: "EDIT_POST", payload: { id, title, content } });
  if (cb) {
    cb();
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { fetchPosts, addBlogPost, removeBlogPost, editBlogPost },
  initialState
);

export const useBlogPosts = () => useContext(Context);
