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

  return (
    <>
      <Search />
      {error && <Error error={error} />}

      <section className="home container grid grid__home">
        {data.map((job) => (
          <Card key={job.id} job={job} />
        ))}

        {!error && (
          <>
            {loading ? (
              <Loader loadingState="fetchingMoreJobs" />
            ) : (
              <div className="home__cta">
                <button className="btn btn__load" onClick={loadMore}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
