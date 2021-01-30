export const MAKE_REQUEST = "MAKE_REQUEST";
export const makeRequest = () => ({
  type: MAKE_REQUEST,
});

export const FETCH_DATA = "FETCH_DATA";
export const fetchData = (jobs) => ({
  type: FETCH_DATA,
  payload: { jobs },
});

export const HAS_NEXT_PAGE = "HAS_NEXT_PAGE";
export const hasNextPage = (hasNextPage) => ({
  type: HAS_NEXT_PAGE,
  payload: { hasNextPage },
});

export const FAILURE_TO_FETCH_DATA = "FAILURE_TO_FETCH_DATA ";
export const failureToFetchData = (error) => ({
  type: FAILURE_TO_FETCH_DATA,
  payload: { error },
});
