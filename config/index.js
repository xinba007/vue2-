const debug = require("debug")(":::");

const {
  VUE_APP_DOWNLOAD_URL: DownloadUrl,
  VUE_APP_ENV: Env,
  VUE_APP_PROXY_URI: ProxyUri,
  VUE_APP_PREFIX: Prefix,
  VUE_APP_OA_PREFIX: oaPrefix,
  VUE_APP_REQUEST_TIMEOUT: RequestTimeout,
  VUE_APP_OSS_URL: OSS_URL,
  NODE_RUN: NodeRun,
  VUE_APP_APP_ID: AppId,
  VUE_APP_QYWX_APPID:qywxAppid,
  VUE_APP_QYWX_AGENTID: qywxAgentid,
  VUE_APP_QYWX_REDIRECTURL:qywxRedirectUrl,
  VUE_APP_QYWX_STATE:qywxState,
  VUE_APP_IMAGE_UTL: imageUrl
} = process.env;

debug.enabled = Env !== "production";
debug(`current env is ${Env}`);

module.exports = {
  Env /* 环境变量 */,
  ProxyUri /* 服务端uri */,
  RequestTimeout /* axios 接口请求超时 */,
  OSS_URL /* 阿里云 oss地址 */,
  BaseUrl: ProxyUri /* baseUrl */,
  NodeRun /* 启动环境 local 本地 */,
  AppId,
  Prefix/* 请求系统前缀 */,
  oaPrefix,
  qywxAppid/* 企业微信配置*/,
  qywxAgentid,
  qywxRedirectUrl,
  qywxState,
  imageUrl,
  DownloadUrl/*下载文件路径拼接前缀*/,
};
