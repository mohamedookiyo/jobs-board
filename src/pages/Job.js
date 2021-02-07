import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useFetchJobs from "../hooks/useFetchJobs";
import { fetchSingleJob } from "../api/fetchJobs";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { beautifyJobDate } from "../helpers/beautifyJobDate";
import searchIcon from "../images/desktop/icon-search.svg";

// Job view component
const Job = ({ match }) => {
  // Use custom hook
  const { loading } = useFetchJobs();

  // Use useState
  const [job, setJob] = useState({});
  const [error, setError] = useState();

  // Use useEffect
  useEffect(() => {
    // Moving page to top
    window.scrollTo(0, 0);

    // Fetch data of single job
    fetchSingleJob(match.params.jobID)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        setError([
          "Oops, something went wrong!",
          "We can't seem to find the job you're looking for. Try going back to the home page.",
          false,
        ]);
      });
  }, [match.params.jobID]);

  // Extract hostname from company url
  const cleanURL = (url) => {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);

    return matches && matches[1].split("w.")[1];
  };

  // Handle apply now

  // Email
  const applyNowEmail = (text) => {
    const match = /\S+[a-z0-9]@[a-z0-9.]+/;

    try {
      const isMatch = text.match(match)[0];

      return isMatch;
    } catch (_error) {
      return null;
    }
  };

  // Appy message for email
  const applyNowEmailMessage = (text) => {
    try {
      const message = text.replace(applyNowEmail(text), "");

      return message;
    } catch (_error) {
      return null;
    }
  };

  // Link
  const applyNowLink = (text) => {
    try {
      const link = text.split("://")[1];

      return `https://${link}`;
    } catch (_error) {
      return null;
    }
  };

  // Appy message for link
  const applyNowLinkMessage = (text) => {
    try {
      const message = text.replace(applyNowLink(text), "");

      return message;
    } catch (_error) {
      return null;
    }
  };

  return (
    <>
      {loading && <Loader loadingState="fetchingJobs" />}

      {error ? (
        <Error error={error} />
      ) : (
        <>
          <div className="job container">
            <div className="job__header grid grid__job-header">
              <div className="job__company grid grid__company-info">
                <div className="job__company-logo">
                  <img
                    src={job.company_logo ? job.company_logo : searchIcon}
                    alt={`${job.company} Logo`}
                  />
                </div>
                <div className="job__company-url">
                  <h3>{job.company}</h3>
                  <p>{cleanURL(`${job.company_url}`)}</p>
                </div>
              </div>
              <div className="job__company-site">
                {cleanURL(`${job.company_url}`) && (
                  <a
                    href={job.company_url}
                    className="btn btn__company"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Company Site
                  </a>
                )}
              </div>
            </div>

            <div className="job__body">
              <div className="job__body-header">
                <div className="job__body-heading">
                  <div className="card__info">
                    <span>
                      {beautifyJobDate(Date.now(), Date.parse(job.created_at))}
                    </span>
                    <span className="card__info-separator">•</span>
                    <span>{job.type}</span>
                  </div>
                  <h2 className="job__body-title">{job.title}</h2>
                  <p className="card__location">{job.location}</p>
                </div>
                <div className="job__body-cta">
                  <a href="#apply-now" className="btn btn__apply">
                    Apply Now
                  </a>
                </div>
              </div>

              <div className="job__body-text flow">
                <ReactMarkdown source={job.description} />
              </div>
            </div>

            <div className="job__apply">
              <h3>How to Apply</h3>
              {applyNowEmail(job.how_to_apply) ? (
                <address>
                  <p>{applyNowEmailMessage(job.how_to_apply)}</p>
                  <a
                    href={`mailto:${applyNowEmail(job.how_to_apply)}`}
                    className="job__apply-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {applyNowEmail(job.how_to_apply)}
                  </a>
                </address>
              ) : (
                <>
                  <p>{applyNowLinkMessage(job.how_to_apply)}</p>
                  <a
                    href={applyNowLink(job.how_to_apply)}
                    className="job__apply-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {applyNowLink(job.how_to_apply)}
                  </a>
                </>
              )}
            </div>
          </div>

          <footer className="footer">
            <div className="footer__wrapper container">
              <div className="card__title">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
              <div className="footer__cta">
                <a
                  href={
                    applyNowEmail(job.how_to_apply)
                      ? `mailto:${applyNowEmail(job.how_to_apply)}`
                      : applyNowLink(job.how_to_apply)
                  }
                  id="apply-now"
                  className="btn btn__apply"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Job;
