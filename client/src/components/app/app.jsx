import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APPRoute } from "../../const";
import ProtectedRoute from "../protected-route/protected-route";
import CreaturePDF from "../../pages/CreaturePDF/CreaturePDF";

const MainLayout = lazy(() => import("../mainLayout/mainLayout"));
const UserLayout = lazy(() => import("../userLayout/userLayout"));
const EntryPage = lazy(() => import("../../pages/EntryPage/EntryPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const ForSigningPage = lazy(() =>
  import("../../pages/ForSigningPage/ForSigningPage")
);
const SigningPage = lazy(() => import("../../pages/SigningPage/SigningPage"));
const ShowApplication = lazy(() => import("../show/show"));
//const CreaturePDf = lazy(() => import("../pages/CreaturePDF/CreaturePDF"));
const SignPage = lazy(() => import("../../pages/SignPage/SignPage"));
const NotFoundScreen = lazy(() =>
  import("../not-found-screen/not-found-screen")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={APPRoute.ENTRY} element={<EntryPage />} />
            <Route
              path={APPRoute.REGISTRATION}
              element={<RegistrationPage />}
            />
            <Route path={APPRoute.LOGIN} element={<SignInPage />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.MAIN} element={<MainPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.FORSIGNING} element={<ForSigningPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.SIGNING} element={<SigningPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.SHOW} element={<ShowApplication />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.CREATURE} element={<CreaturePDF />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={APPRoute.SIGN} element={<SignPage />} />
            </Route>
          </Route>
          <Route path={APPRoute.NOTFOUND} element={<NotFoundScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
