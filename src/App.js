import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeView, LoginView, RegistrationView, LogoutView } from "./views";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/signup" component={RegistrationView} />
      <Route exact path="/logout" component={LogoutView} />
    </Router>
  );
}

export default App;
