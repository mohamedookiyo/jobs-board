const Loading = ({ loadingState }) => {
  return (
    <>
      {loadingState === "fetchingJobs" ? (
        <div className="loading loading__full">
          <div className="spinner">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <div className="spinner">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
