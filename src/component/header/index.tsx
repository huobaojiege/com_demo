import React, { FC } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.less";

import logoImage from "../../assets/img/homepage/logo.png";
const { Header } = Layout;

const HomeHeader: FC = (props) => {
  const navigate = useNavigate();
  const loginOut = () => {
    localStorage.removeItem("user_info");
    navigate("/", { replace: true });
  };
  return (
    <Header>
      <div>
        <img className="homePage_logo" src={logoImage} alt="logo" />
      </div>
      <div>
        <a onClick={loginOut}>退出登录</a>
      </div>
    </Header>
  );
};

export default HomeHeader;
