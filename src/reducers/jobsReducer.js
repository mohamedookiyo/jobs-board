import {
  MAKE_REQUEST,
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
