import { getAction, postAction, putAction, deleteAction } from "./manage";

// 查询开启设置 ok
type GET_TM_FAQ_RECEPTParams = {
  // [propName: string]: any;
};
export const GET_TM_FAQ_RECEPT = (params: GET_TM_FAQ_RECEPTParams = {}) => {
  return getAction(`/tm/faq/recept.do`, params);
};

// 保存开启设置 ok
type POST_TM_FAQ_RECEPTParams = {
  receptType: string; //开启时间类型|0-不开启，1-全天，2-自定义时段
  beginTime?: string; //开始时间，格式为HH:mm
  endTime?: string; //结束时间，格式为HH:mm
};
export const POST_TM_FAQ_RECEPT = (params: POST_TM_FAQ_RECEPTParams) => {
  return postAction(`/tm/faq/recept/save.do`, params);
};

// 查询自动回复语 ok
type GET_TM_FAQ_REPLYParams = {};
export const GET_TM_FAQ_REPLY = (params: GET_TM_FAQ_REPLYParams = {}) => {
  return getAction(`/tm/faq/reply.do`, params);
};

// 保存自动回复语 ok
type POST_TM_FAQ_REPLYParams = {
  replyContent: string; //自动回复语内容
};
export const POST_TM_FAQ_REPLY = (params: POST_TM_FAQ_REPLYParams) => {
  return postAction(`/tm/faq/reply/save.do`, params);
};

// 常见问答的列表查询
type GET_TM_FAQ_LISTParams = {};
export const GET_TM_FAQ_LIST = (params: GET_TM_FAQ_LISTParams = {}) => {
  return getAction(`/tm/faq/list.do`, params);
};

// 保存一条FAQ
type POST_TM_FAQParams = {
  infoId?: string; //问题ID
  question?: string; //问题内容
  answer?: string; //答案
  relType?: string; //关联类型|0-纯文本，1-产品，2-视频
  relId?: string;
};
export const POST_TM_FAQ = (params: POST_TM_FAQParams) => {
  return getAction(`/api/repos/jaywcjlove/webpack-api-mocker`, params);
};

// 删除一条FAQ
type PUT_TM_FAQParams = {
  infoId: string; //问题ID
};
export const PUT_TM_FAQ = (params: PUT_TM_FAQParams) => {
  return postAction(`/tm/faq/delete.do`, params);
};

// 根据prodId获取FAQ需要的产品详细信息
type POST_TM_FAQ_PRODLIST_Params = string[]; //问题ID

export const POST_TM_FAQ_PRODLIST = (params: POST_TM_FAQ_PRODLIST_Params) => {
  return postAction(`/tm/faq/prodlist.do`, params);
};
