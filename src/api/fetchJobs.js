import axios from "axios";

// Axious instance with baseUrl
const api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://jobs.github.com/",
});

// Fecth jobs
export const fetchJobs = async (tokenToCancel, page, params) => {
  const jobs = await api.get("positions.json", {
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
  const jobs = await api.get("positions.json", {
    cancelToken: tokenToCancel.token,
    params: {
      markdown: true,
      page: page + 1,
      ...params,
    },
  });

  return jobs;
};

// Fecth single job
export const fetchSingleJob = async (jobID) => {
  const job = await api.get(`positions/${jobID}.json`, {
    params: {
      markdown: true,
    },
  });

  return job;
};
