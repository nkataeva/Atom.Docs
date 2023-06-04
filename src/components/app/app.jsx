import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Entry from "../entry/entry";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import SignIn from "../sign-in/sign-in";
import Registration from "../registration/registration";
import { APPRoute } from "../../const";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = {APPRoute.MAIN} exact>
          <Entry/>
        </Route>
        <Route path = {APPRoute.REGISTRATION} exact>
          <Registration/>
        </Route>
        <Route path = {APPRoute.SIGN_IN} exact>
          <SignIn/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
