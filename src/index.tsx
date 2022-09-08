import ReactDOM from "react-dom";
import React from "react";
import "./assets/styles/global.less";

import AppRoute from "./router";

import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <AppRoute />
  </ConfigProvider>,
  document.getElementById("root")
);
