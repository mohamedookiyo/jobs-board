import searchIcon from "../images/desktop/icon-search.svg";
import locationIcon from "../images/desktop/icon-location.svg";

const Search = () => {
  return (
    <div className="container">
      <form className="form grid grid__search">
        <div className="form__description">
          <img src={searchIcon} alt="Search icon" />
          <input
            type="text"
            name="description"
            placeholder="Filter by title and companies"
          />
        </div>
        <div className="form__location">
          <img src={locationIcon} alt="Location icon" />
          <input type="text" name="location" placeholder="Filter by location" />
        </div>
        <div className="form__cta">
          <label className="form__checkbox">
            <input type="checkbox" />
            <span>Full Time</span>
          </label>
          <button className="btn btn__search" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
