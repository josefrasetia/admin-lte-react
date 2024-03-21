import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Main from "@modules/main/Main";
import Login from "@modules/login/Login";
import Register from "@modules/register/Register";
import ForgetPassword from "@modules/forgot-password/ForgotPassword";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import { useWindowSize } from "@app/hooks/useWindowSize";
import { calculateWindowSize } from "@app/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "@app/store/reducers/ui";
import ReactGA from "react-ga4";

import Dashboard from "@pages/Dashboard";
import Blank from "@pages/Blank";
import SubMenu from "@pages/SubMenu";
import Profile from "@pages/profile/Profile";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { setAuthentication } from "./store/reducers/auth";
import { getAuthStatus } from "./utils/oidc-providers";
import { Image } from "@profabric/react-components";
import NotFound from "./pages/NotFound";
import axios from "axios";

const { VITE_NODE_ENV } = import.meta.env;

export interface routesType {
  path: string;
  element: string;
  children?: routesType[];
}

export interface elementTypes {
  [key: string]: JSX.Element;
}

export const elements: elementTypes = {
  Main: <Main />,
  Login: <Login />,
  Register: <Register />,
  ForgetPassword: <ForgetPassword />,
  RecoverPassword: <RecoverPassword />,
  Dashboard: <Dashboard />,
  Blank: <Blank />,
  SubMenu: <SubMenu />,
  Profile: <Profile />,
  NotFound: <NotFound />,
  PublicRoute: <PublicRoute />,
  PrivateRoute: <PrivateRoute />,
};

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const location = useLocation();

  const [dataRoute, setDataRoute] = useState<routesType[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([getAuthStatus()]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log("error", error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  useEffect(() => {
    axios
      .get("http://localhost:9002/api")
      .then((response) => {
        setDataRoute(response.data);
      })
      .catch((error) => {
        toast.error("Failed to load routes, try again later.");
      });
  }, []);

  return (
    <>
      <div
        className={`preloader flex-column justify-content-center align-items-center ${!isAppLoading && dataRoute.length > 0 ? "hide" : ""}`}
      >
        <Image
          className="animation__shake"
          src="/img/logo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
      {!isAppLoading && dataRoute.length > 0 && (
      <Routes>
        {dataRoute.map((route: routesType, index: number) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={elements[route.element]}
            >
              {route.children &&
                route.children.map((child: routesType, index: number) => {
                  if (!child.children) {
                    return (
                      <Route
                        key={index}
                        path={child.path}
                        element={elements[child.element]}
                      />
                    );
                  }
                  return (
                    <Route
                      key={index}
                      path={child.path}
                      element={elements[child.element]}
                    >
                      {child.children &&
                        child.children.map(
                          (subChild: routesType, index: number) => {
                            return (
                              <Route
                                key={index}
                                path={subChild.path}
                                element={elements[subChild.element]}
                              />
                            );
                          }
                        )}
                    </Route>
                  );
                })}
            </Route>
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
      )}
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
