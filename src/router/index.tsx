/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "./routes";

export default function () {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    //   setupInterceptor(store)
    setMounted(true);
  }, []);

  return mounted ? (
    <Router>
      <MainRoutes />
    </Router>
  ) : null;
}
