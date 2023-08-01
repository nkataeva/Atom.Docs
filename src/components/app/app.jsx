import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APPRoute } from "../../const";
import ProtectedRoute from "../protected-route/protected-route";

const Layout = lazy(() => import("../layout/layout"));
const Entry = lazy(() => import("../entry/entry"));
const Registration = lazy(() => import("../registration/registration"));
const SignIn = lazy(() => import("../sign-in/sign-in"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const ForSigningPage = lazy(() => import("../../pages/ForSigningPage/ForSigningPage"));
const Signing = lazy(() => import("../signing/signing"));
const ShowApplication = lazy(() => import("../show/show"));
const Creature = lazy(() => import("../creature/creature"));
const NotFoundScreen = lazy(() => import("../not-found-screen/not-found-screen"));

const App = () => {
  const isAuth = true;
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<Layout />}>
            <Route path={APPRoute.ENTRY} element={<Entry />} />
            <Route path={APPRoute.REGISTRATION} element={<Registration />} />
            <Route path={APPRoute.LOGIN} element={<SignIn />} />
            <Route element={<ProtectedRoute authUser={isAuth} />}>
              <Route path={APPRoute.MAIN} element={<MainPage />} />
            </Route>
            <Route element={<ProtectedRoute authUser={isAuth} />}>
              <Route path={APPRoute.SIGN} element={<ForSigningPage />} />
            </Route>
            <Route element={<ProtectedRoute authUser={isAuth} />}>
              <Route path={APPRoute.SIGNING} element={<Signing />} />
            </Route>
            <Route element={<ProtectedRoute authUser={isAuth} />}>
              <Route path={APPRoute.SHOW} element={<ShowApplication />} />
            </Route>
            <Route element={<ProtectedRoute authUser={isAuth} />}>
              <Route path={APPRoute.CREATURE} element={<Creature />} />
            </Route>
          </Route>
          <Route path={APPRoute.NOTFOUND} element={<NotFoundScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;