import {
  CREATE_POST,
  FETCH_POST,
  DELETE_POST,
  UPDATE_POST,
} from "./blog.constants";

export const blogReducer = (state, { type, payload }) => {
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

    case DELETE_POST.PENDING:
      return { ...state, loading: true };
    case DELETE_POST.SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case DELETE_POST.ERROR:
      return { ...state, loading: false, error: payload };

    case UPDATE_POST.PENDING:
      return { ...state, loading: true };
    case UPDATE_POST.SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === payload.id ? { ...post, ...payload } : post
        ),
      };
    }
    case UPDATE_POST.ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
