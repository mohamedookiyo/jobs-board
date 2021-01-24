import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Search from "./components/Search";
import Home from "./pages/Home";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Search />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
