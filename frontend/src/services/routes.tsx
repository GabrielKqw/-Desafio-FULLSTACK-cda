import { useRoutes } from "react-router-dom";
import Login from "../pages/login/login";
import SingUp from ".././pages/register/singup";
import Dashboard from ".././pages/dashboard/dashboard";
import AllAchievements from "../pages/achievements/AllAchievements";
import { RoutesPath } from "../routes";

const Router = () => {
  return useRoutes([
    {
      path: RoutesPath.LOGIN,
      element: <Login />,
    },
    {
      path: RoutesPath.REGISTER,
      element: <SingUp />,
    },
    {
      path: RoutesPath.DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: RoutesPath.ALL_ACHIEVEMENTS,
      element: <AllAchievements />,
    },
  ]);
};

export default Router;
