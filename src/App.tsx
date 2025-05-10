import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import EstablishmentDetailPage from "./components/EstablishmentDetailPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/establishments/:id" component={EstablishmentDetailPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )
  }
}

export default App;
