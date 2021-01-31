import { useReducer, useEffect } from "react";
import axios from "axios";
import { jobsReducer } from "../reducers/jobsReducer";
import { fetchJobs, fetchMoreJobs } from "../api/fetchJobs";
import {
  makeRequest,
  makeNewRequest,
  fetchData,
  hasNextPage,
  failureToFetchData,
} from "../actions/jobActions";

// Initial state
const intialState = { data: [], loading: true, error: false };

// Custom hook
export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(jobsReducer, intialState);

  useEffect(() => {
    if (page < 2) {
      // Make request to fetch new data
      dispatch(makeNewRequest());
    }

    if (page > 1) {
      // Fetch rest of the data (pages)
      dispatch(makeRequest());
    }

    // Fetch jobs
    const cancelToken1 = axios.CancelToken.source();

    fetchJobs(cancelToken1, page, params)
      .then((response) => {
        if (response.data.length !== 0) {
          dispatch(fetchData(response.data));
        } else {
          // Custom error message
          const description = params.description ? `${params.description}` : "";
          const location = params.location ? `in ${params.location}` : "";
          const fullTime = params.full_time ? "full time" : "";

          const errorMessage = `No ${fullTime} ${description} jobs found ${location}.`;

          dispatch(
            failureToFetchData([
              "Oops, something went wrong!",
              errorMessage,
              false,
            ])
          );
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        dispatch(
          failureToFetchData([
            "Oops, something went wrong!",
            "Please refresh the page or make a new search query.",
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
