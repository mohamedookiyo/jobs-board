import cardLogo from "../images/desktop/icon-search.svg";
import { beautifyJobDate } from "../helpers/beautifyJobDate";

const Card = ({ job }) => {
  return (
    <div className="card">
      <div className="card__logo">
        <img
          src={job.company_logo ? job.company_logo : cardLogo}
          alt={`${job.company} logo`}
        />
      </div>
      <div className="card__info">
        <span>{beautifyJobDate(Date.now(), Date.parse(job.created_at))}</span>
        <span className="card__info-separator">•</span>
        <span>{job.type}</span>
      </div>
      <div className="card__title">
        <h3>{job.title}</h3>
        <p>{job.company}</p>
      </div>
      <div className="card__location">
        <p>{job.location}</p>
      </div>
    </div>
  );
};

export default Card;
