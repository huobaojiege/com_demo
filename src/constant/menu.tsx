import React from "react";
import {
  HomeOutlined,
  //   ClockCircleOutlined,
  //   FileDoneOutlined,
  //   ScheduleOutlined,
  BarChartOutlined,
  //   FormOutlined,
  //   UserOutlined,
  //   InsertRowLeftOutlined,
  //   SnippetsOutlined,
} from "@ant-design/icons";

export const HOME_SIDER_MENU_LIST = [
  {
    path: "/home/index",
    icon: <HomeOutlined />,
    name: "后台首页",
  },
  {
    path: "",
    icon: <BarChartOutlined />,
    name: "财务管理",
    children: [
      {
        path: "/home/finance",
        name: "资金列表",

        children: [
          {
            path: "/home/capitalFlow/type",
            name: "创建类别",
          },
        ],
      },
      // {
      //   path: "/home/capitalFlow/type",
      //   name: "创建类别",
      // },
    ],
  },
];
