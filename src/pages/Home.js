import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchJobs from "../hooks/useFetchJobs";
import Search from "../components/Search";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  // Set params and page state
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  // Form data
  const formData = {};

  // Handle submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Set page to 1 after each new search query
    setPage(1);

    setParams((prevParams) => {
      return { ...prevParams, ...formData };
    });
  };

  // Use custom hook
  const { data, loading, error, hasNextPage } = useFetchJobs(params, page);

  // Update page number
  const loadMore = () => {
    if (hasNextPage) setPage(page + 1);
  };

  // Handle params
  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;

    formData[param] = value;
  };

  // Handle full time checkbox
  const handleFullTime = (e) => {
    const param = e.target.name;
    const value = e.target.checked;

    formData[param] = value;
  };

  return (
    <>
      <Search
        onParamChange={handleParamChange}
        onFullTime={handleFullTime}
        onFormSubmit={handleFormSubmit}
      />
      {error && <Error error={error} />}

      <section className="home container grid grid__home">
        {!error && (
          <>
            {data.map((job) => (
              <Link to={`/positions/${job.id}`} key={job.id} className="card">
                <Card job={job} />
              </Link>
            ))}

            {loading ? (
              <Loader loadingState="fetchingMoreJobs" />
            ) : (
              <div className="home__cta">
                {hasNextPage && (
                  <button className="btn btn__load" onClick={loadMore}>
                    Load More
                  </button>
                )}

                {!hasNextPage && (
                  <p className="home__text">
                    There are no more jobs to display at this time.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
