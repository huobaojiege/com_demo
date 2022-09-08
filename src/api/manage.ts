import { axios } from "./request";

import qs from "query-string";

//get
export function getAction(url:string, parameter:any, meta = {}) {
  return axios({
    ...{
      url: url,
      method: "get",
      params: parameter,
    },
    ...meta,
  });
}

//post请求
export function postAction(url:string, parameter:any, meta = {}) {
  return axios({
    ...{
      url: url,
      method: "post",
      data: parameter,
    },
    ...meta,
  });
}

//put请求
export function putAction(url:string, parameter:any, meta = {}) {
  return axios({
    ...{
      url: url,
      method: "put",
      data: parameter,
    },
    ...meta,
  });
}

//delete请求
export function deleteAction(url:string, parameter:any, meta = {}) {
  return axios({
    ...{
      url: url,
      method: "delete",
      params: parameter,
    },
    ...meta,
  });
}
