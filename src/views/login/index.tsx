import React, { FC, useMemo } from "react";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "query-string";
import "./style.less";
type LoginPageProps = {};
const Login: FC<LoginPageProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = useMemo(() => {
    const url = qs.parse(location.search).redirectUrl as string;
    return url || "/home/index";
  }, []);

  const loginClick = () => {
    localStorage.setItem("user_info", "122");
    navigate(redirectUrl, { replace: true });
  };
  return (
    <div className="login_pape">
      <div>
        <h3>登陆页面</h3>
        <Button onClick={loginClick}> 确定登录</Button>
        <Button>注册账号</Button>
      </div>
    </div>
  );
};

export default Login;
