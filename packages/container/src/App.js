import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const Marketing = lazy(() => import("./components/MarketingApp"));
const Auth = lazy(() => import("./components/AuthApp"));
const Dashboard = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSigned] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSigned(false)}
          />

          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <Auth onSignIn={() => setIsSigned(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <Dashboard />
              </Route>
              <Route path="/" component={Marketing} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
