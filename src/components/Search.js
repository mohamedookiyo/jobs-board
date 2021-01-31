// Icons
import searchIcon from "../images/desktop/icon-search.svg";
import locationIcon from "../images/desktop/icon-location.svg";
import searchIconMobile from "../images/desktop/icon-search-white.svg";
import closeIcon from "../images/mobile/icon-close.svg";

// This function displays and hides the popup form
const handlePopup = (e) => {
  e.preventDefault();
  const formPopup = document.querySelector(".form__popup");
  const formOverlay = document.querySelector(".form__overlay");
  const body = document.querySelector("body");

  formPopup.classList.toggle("active");
  formOverlay.classList.toggle("active");
  // Locks the scroll of the page
  body.classList.toggle("active");
};

// Search form component
const Search = ({ onParamChange, onFullTime, onFormSubmit }) => {
  return (
    <div className="container">
      <form className="form grid grid__search" onSubmit={onFormSubmit}>
        <div className="form__description">
          <img src={searchIcon} alt="Search icon" />
          <input
            type="text"
            name="description"
            onChange={onParamChange}
            placeholder="Filter by title and companies"
          />
        </div>
        <div className="form__location">
          <img src={locationIcon} alt="Location icon" />
          <input
            type="text"
            name="location"
            onChange={onParamChange}
            placeholder="Filter by location"
          />
        </div>
        <div className="form__cta">
          <label className="form__checkbox">
            <input type="checkbox" name="full_time" onClick={onFullTime} />
            <span>Full Time</span>
          </label>
          <button className="btn btn__search" type="submit">
            Search
          </button>
        </div>
      </form>
      <form className="form grid grid__search-mobile" onSubmit={onFormSubmit}>
        <div className="form__description">
          <input
            type="text"
            name="description"
            onChange={onParamChange}
            placeholder="Filter by title..."
          />
        </div>
        <div className="form__cta">
          <button className="btn btn__filter" onClick={handlePopup}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <button className="btn btn__icon" type="submit">
            <img src={searchIconMobile} alt="Icon search" />
          </button>
        </div>
      </form>
      <form
        className="form__popup"
        onSubmit={(e) => {
          e.preventDefault();
          handlePopup(e);
          onFormSubmit(e);
        }}
      >
        <div className="form__location">
          <img src={locationIcon} alt="Location icon" />
          <input
            className="form__popup-location"
            type="text"
            name="location"
            onChange={onParamChange}
            placeholder="Filter by location..."
          />
        </div>
        <div className="form__popup-cta">
          <label className="form__checkbox">
            <input type="checkbox" name="full_time" onClick={onFullTime} />
            <span>Full Time Only</span>
          </label>
          <button className="btn btn__search btn--full" type="submit">
            Search
          </button>
        </div>
        <img
          className="form__popup-close"
          src={closeIcon}
          alt="Icon close"
          onClick={handlePopup}
        />
      </form>
      <div className="form__overlay"></div>
    </div>
  );
};

export default Search;
