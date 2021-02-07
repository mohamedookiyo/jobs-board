import { Link } from "react-router-dom";
import Error from "../components/Error";

const NotFound = () => {
  const notFoundStyle = {
    textAlign: "center",
  };

  return (
    <div className="container">
      <Error
        error={[
          "Oops, something went wrong!",
          "We can't seem to find the page you're looking for. Try going back to the home page.",
          false,
        ]}
      />
      <div style={notFoundStyle}>
        <Link to="/" className="btn btn__apply">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
