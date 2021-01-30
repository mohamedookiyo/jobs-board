import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import useFetchJobs from "./hooks/useFetchJobs";

import "./App.scss";

const App = () => {
  const { loading } = useFetchJobs();

  return (
    <Router>
      <main>
        <>
          <Header />
          {loading ? (
            <Loader loadingState="fetchingJobs" />
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          )}
        </>
      </main>
    </Router>
  );
};

export default App;
