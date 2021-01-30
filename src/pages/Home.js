import { useState } from "react";
import useFetchJobs from "../hooks/useFetchJobs";
import Search from "../components/Search";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  // Set params and page state
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

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

    // Set page to 1 after each new search query
    setPage(1);

    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  // Handle full time checkbox
  const handleFullTime = (e) => {
    const param = e.target.name;
    const value = e.target.checked;

    // Set page to 1 after each new search query
    setPage(1);

    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <>
      <Search
        params={params}
        onParamChange={handleParamChange}
        onFullTime={handleFullTime}
      />
      {error && <Error error={error} />}

      <section className="home container grid grid__home">
        {!error && (
          <>
            {data.map((job) => (
              <Card key={job.id} job={job} />
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
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
