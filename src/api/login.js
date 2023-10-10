import request from "@/utils/Request";

/**
 * @author Gj
 * @description 2020年 5月28日 重构 login接口文档
 */

/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
export const login = (data) => {
  return request({
    url: `/webToken/login`,
    method: "post",
    data,
  });
};

/**
 * 登出
 */
export const logOut = () => {
  return request({
    url: `/webToken/loginOut`,
    method: "post",
  });
};
