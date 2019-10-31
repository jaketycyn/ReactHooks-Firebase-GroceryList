import React, { useState, useEffect } from "react";
import "./styles.css";
import HomePage from "../HomePage";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import { CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../firebase";
import Theme from "../../ui/theme";

import { ThemeProvider } from "styled-components";
import Wrapper from "../../ui/components/Wrapper";

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Wrapper>
    </ThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
