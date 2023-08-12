import { Navigate, Outlet } from "react-router-dom";
import { APPRoute } from "../../const";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

const ProtectedRoute = () => {
  if (!userStore.isUserAuth) {
    return <Navigate to={APPRoute.LOGIN} replace />;
  }

  return <Outlet />;
};

export default observer(ProtectedRoute);
