import { useReducer, useEffect } from "react";
import axios from "axios";
import { jobsReducer } from "../reducers/jobsReducer";
import { fetchJobs, fetchMoreJobs } from "../api/fetchJobs";
import {
  makeRequest,
  fetchData,
  hasNextPage,
  failureToFetchData,
} from "../actions/jobActions";

// Initial state
const intialState = { data: [], loading: true };

// Custom hook
export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(jobsReducer, intialState);

  useEffect(() => {
    // Make request
    dispatch(makeRequest());

    // Fetch jobs
    const cancelToken1 = axios.CancelToken.source();

    fetchJobs(cancelToken1, page, params)
      .then((response) => {
        dispatch(fetchData(response.data));
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        dispatch(
          failureToFetchData([
            "Oops, something went wrong!",
            "Please refresh the page or try again later.",
            true,
          ])
        );
      });

    // Fetch more jobs
    const cancelToken2 = axios.CancelToken.source();

    fetchMoreJobs(cancelToken2, page, params)
      .then((response) => {
        dispatch(hasNextPage(response.data.length !== 0));
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        dispatch(
          failureToFetchData([
            "Oops, something went wrong!",
            "Please refresh the page or try again later.",
            true,
          ])
        );
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}
