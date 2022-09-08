import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
// import { toast } from "@future/toast";
import { NET_WORK_MESSAGE } from "@/config";

/**
 * 全局 baseURL
 */
let baseURL = "";

// 创建 axios 实例
const service = axios.create({
  baseURL, // api base_url
  timeout: 30000, // 请求超时时间
});

//错误信息
const codeMessage: { [key: number]: string } = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

//错误信息抛出
const errorMessage = (error: any) => {
  if (error.toJSON()) {
    let errorJson = error.toJSON();
    const errorText = codeMessage[errorJson?.status] || errorJson?.message;
    // toast(NET_WORK_MESSAGE, {
    //   type: "warning",
    //   duration: 3000,
    // });
    return Promise.reject(error.toJSON());
  } else {
    return Promise.reject(error);
  }
};
// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.method == "get") {
      config.params = {
        ...config.params,
        _t: Math.floor(new Date().valueOf() * Math.random()),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response: AxiosResponse<API.ResponseOptions>) => {
    debugger
    if (response?.data?.code === "0") {
      return response?.data;
    } else {
      let messageInfo = NET_WORK_MESSAGE;
      switch (response?.data?.code) {
        case "100001":
          messageInfo = "操作太频繁，请稍后再试。";
          break;
        default:
          messageInfo = NET_WORK_MESSAGE;
          break;
      }
      // toast(response?.data?.msg ?? messageInfo, {
      //   type: "warning",
      //   duration: 3000,
      // });
      return Promise.reject(response?.data);
    }
  },
  // 超出 2xx 范围的状态码都会触发该函数。
  errorMessage
);

export { service as axios };
