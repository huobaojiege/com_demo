import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

import PrivateRoute from "../component/private-route";

import Login from "../views/login";
import NoMatch from "../views/exception/404";
import MainEntry from "../views/main";
import HomeIndex from "../views/index";
// import Finance from "../views/finance";
const Finance = lazy(() => import("../views/finance"));
export function MainRoutes() {
  const _Login = (
    <PrivateRoute
      element={Login}
      meta={{
        title: "登录",
      }}
    />
  );
  const elements = useRoutes([
    {
      path: "/",
      element: _Login,
    },
    {
      path: "/login",
      element: _Login,
    },
    {
      path: "/home",
      element: (
        <PrivateRoute
          element={MainEntry}
          meta={{
            requiresAuth: true,
            title: "后台首页",
          }}
        />
      ),

      children: [
        {
          path: "index",
          element: (
            <PrivateRoute
              element={HomeIndex}
              meta={{
                requiresAuth: true,
                title: "后台首页",
              }}
            />
          ),
        },
        {
          path: "finance",
          element: (
            <PrivateRoute
              element={Finance}
              meta={{
                requiresAuth: true,
                title: "资产管理",
              }}
            />
          ),
        },

        {
          path: "*",
          element: (
            <PrivateRoute
              element={NoMatch}
              meta={{
                requiresAuth: false,
                title: "404 Not Found",
              }}
            />
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <PrivateRoute
          element={NoMatch}
          meta={{
            requiresAuth: false,
            title: "404 Not Found",
          }}
        />
      ),
    },
  ]);
  return elements;
}
