import arrowIcon from "../images/desktop/icon-arrow-up.svg";

// Display or hide the scroll back to top arrow depending on offset
const handleScrollBackToTop = () => {
  const scrollBackToTopArrow = document.querySelector(".scroll-back-to-top");
  const offset = 1080;

  if (
    document.body.scrollTop > offset ||
    document.documentElement.scrollTop > offset
  ) {
    scrollBackToTopArrow.style.display = "block";
  } else {
    scrollBackToTopArrow.style.display = "none";
  }
};

// Call the handleScrollBackToTop function on window scroll
window.onscroll = () => handleScrollBackToTop();

// Scroll to the top of the document when the user clicks on the button
const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log("working...");
};

// ScrollBackToTop component
const ScrollBackToTop = () => {
  return (
    <div className="scroll-back-to-top" onClick={scrollToTop}>
      <img
        src={arrowIcon}
        alt="Scroll back to top"
        aria-label="Scroll back to top"
      />
    </div>
  );
};

export default ScrollBackToTop;
