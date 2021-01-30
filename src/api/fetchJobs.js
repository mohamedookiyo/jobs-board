import axios from "axios";

// Axious instance with baseUrl
const api = axios.create({
  baseURL: "/positions.json",
});

// Fecth jobs
export const fetchJobs = async (tokenToCancel, page, params) => {
  const jobs = await api.get("", {
    cancelToken: tokenToCancel.token,
    params: {
      markdown: true,
      page: page,
      ...params,
    },
  });

  return jobs;
};

// Fetch more jobs
export const fetchMoreJobs = async (tokenToCancel, page, params) => {
  const jobs = await api.get("", {
    cancelToken: tokenToCancel.token,
    params: {
      markdown: true,
      page: page + 1,
      ...params,
    },
  });

  return jobs;
};
