import { useEffect } from "react";
import { Link } from "react-router-dom";

// Images
import logo from "../../images/desktop/logo.svg";
import sun from "../../images/desktop/icon-sun.svg";
import moon from "../../images/desktop/icon-moon.svg";

// Header component
const Header = () => {
  // Check for saved user preference
  useEffect(() => {
    const themeSwitchToggle = document.getElementById("theme-switch");

    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      // If theme is === dark then check the checkbox (toggle)
      if (currentTheme === "dark") {
        themeSwitchToggle.checked = true;
      }
    }
  });

  // This function switches theme
  const handleThemeSwitch = (e) => {
    if (e.target.checked) {
      // Set data-theme attribute to the document element (html)
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="DevJobs logo" className="header__logo" />
        </Link>
        <div className="header__icons">
          <img src={sun} alt="Sun icon illustration" />
          <label className="header__theme-switch" htmlFor="theme-switch">
            <input
              type="checkbox"
              id="theme-switch"
              aria-label="Choose between ligh and dark theme."
              onChange={handleThemeSwitch}
            />
            <div className="header__slider round"></div>
          </label>
          <img src={moon} alt="Moon icon illustration" />
        </div>
      </div>
    </header>
  );
};

export default Header;
