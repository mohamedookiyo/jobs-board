import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Loader from "./components/Loader";
import ScrollBackToTop from "./components/ScrollBackToTop";
import NotFound from "./components/NotFound";
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
              <Route exact path="/positions/:jobID" component={Job} />
              <Route component={NotFound} />
            </Switch>
          )}
          <ScrollBackToTop />
        </>
      </main>
    </Router>
  );
};

export default App;
