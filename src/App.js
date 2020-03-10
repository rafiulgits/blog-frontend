import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  HomeView,
  LoginView,
  RegistrationView,
  LogoutView,
  ArticleView
} from "./views";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/signup" component={RegistrationView} />
      <Route exact path="/logout" component={LogoutView} />
      <Route exact path="/article/:id" component={ArticleView} />
    </Router>
  );
}

export default App;
