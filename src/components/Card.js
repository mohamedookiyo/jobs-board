import cardLogo from "../images/desktop/icon-search-white.svg";

const Card = () => {
  return (
    <div className="card">
      <div className="card__logo">
        <img src={cardLogo} alt="Company logo" />
      </div>
      <div className="card__info">
        <span>5h ago</span>
        <span class="card__info-separator">•</span>
        <span>Full Time</span>
      </div>
      <div className="card__title">
        <h3>Senior Software Engineer</h3>
        <p>Photosnap Ltd.</p>
      </div>
      <div className="card__location">
        <p>Columbus, OH</p>
      </div>
    </div>
  );
};

export default Card;
