import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomeView,
  LoginView,
  RegistrationView,
  LogoutView,
  ArticleView,
  ArticleCreateView,
  ArticleUpdateView,
  AccountView
} from "./views";
import BlogView from "./pages/blog";
import SearchView from "./pages/search";
import ErroView from "./pages/error";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/signup" component={RegistrationView} />
        <Route exact path="/logout" component={LogoutView} />
        <Route exact path="/article/:id" component={ArticleView} />
        <Route exact path="/create-article" component={ArticleCreateView} />
        <Route exact path="/article/:id/update" component={ArticleUpdateView} />
        <Route exact path="/account" component={AccountView} />
        <Route exact path="/blog/:name" component={BlogView} />
        <Route exact path="/search" component={SearchView} />
        <Route path="*" component={ErroView} />
      </Switch>
    </Router>
  );
}

export default App;
