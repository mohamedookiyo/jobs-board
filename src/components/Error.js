import serverDownIllustration from "../images/desktop/server-down.svg";
import pageNotFoundIllustration from "../images/desktop/page-not-found.svg";

const Error = ({ error }) => {
  // serverOrClientError = true for server error and false for client error
  const [title, message, serverOrClientError] = error;

  return (
    <div className="error container grid grid__error">
      <div className="error__text">
        <h3 className="error__heading">{title}</h3>
        <p className="error__message">{message}</p>
      </div>
      <div className="error__illustration">
        {serverOrClientError && (
          <img src={serverDownIllustration} alt="Server down illustration" />
        )}

        {!serverOrClientError && (
          <img
            src={pageNotFoundIllustration}
            alt="Page not found illustration"
          />
        )}
      </div>
    </div>
  );
};

export default Error;
