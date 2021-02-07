import {
  MAKE_REQUEST,
  MAKE_NEW_REQUEST,
  FETCH_DATA,
  HAS_NEXT_PAGE,
  FAILURE_TO_FETCH_DATA,
} from "../actions/jobActions";

export const jobsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAKE_NEW_REQUEST:
      return {
        loading: true,
        data: [],
        error: false,
      };
    case FETCH_DATA:
      const { jobs } = payload;
      return {
        ...state,
        loading: false,
        data: state.data.concat(jobs),
      };
    case HAS_NEXT_PAGE:
      const { hasNextPage } = payload;
      return {
        ...state,
        hasNextPage: hasNextPage,
      };
    case FAILURE_TO_FETCH_DATA:
      const { error } = payload;
      return {
        ...state,
        loading: false,
        error: error,
        data: [],
      };
    default:
      return state;
  }
};
