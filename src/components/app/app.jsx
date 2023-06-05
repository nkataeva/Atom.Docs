import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Entry from "../entry/entry";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import SignIn from "../sign-in/sign-in";
import Registration from "../registration/registration";
import Main from "../main/main";
import SignApplication from "../sign/sign";
import Signing from "../signing/signing";
import { ShowApplication } from "../show/show";
import Creature from "../creature/creature";
import { APPRoute } from "../../const";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = {APPRoute.ENTRY} exact>
          <Entry/>
        </Route>
        <Route path = {APPRoute.REGISTRATION} exact>
          <Registration/>
        </Route>
        <Route path = {APPRoute.LOGIN} exact>
          <SignIn/>
        </Route>
        <Route path = {APPRoute.MAIN} exact>
          <Main/>
        </Route>
        <Route path = {APPRoute.SIGN} exact>
          <SignApplication/>
        </Route>
        <Route path = {APPRoute.SIGNING} exact>
          <Signing/>
        </Route>
        <Route path = {APPRoute.SHOW} exact>
          <ShowApplication/>
        </Route>
        <Route path = {APPRoute.CREATURE} exact>
          <Creature/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
