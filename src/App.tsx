import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EstablishmentDetailPage from "./pages/EstablishmentDetailPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { FavouritesProvider } from "./context/FavouritesContext";
import PageLayout from "./pages/PageLayout";

const queryClient = new QueryClient();
class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <FavouritesProvider>
          <PageLayout>
            <Router>
              <Switch>
                <Route path="/establishments/:id" component={EstablishmentDetailPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </Router>
          </PageLayout>
        </FavouritesProvider>
      </QueryClientProvider>
    )
  }
}

export default App;
