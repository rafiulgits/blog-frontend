import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeView, LoginView } from "./views";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/login" component={LoginView} />
    </Router>
  );
}

export default App;
