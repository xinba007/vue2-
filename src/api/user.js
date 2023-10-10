import request from "@/utils/Request";

/**
 * 获取用户权限
 * @param {Number} appId App Id
 */
export const getUserMenuAndPermission = (params) => {
  return request({
    url: `/uc/menu/v1/getUserMenu`,
    method: "get",
    params,
  });
};

/**
 * 获取用户详细信息
 */
export function getUserDetailsInfo() {
  return request({
    url: `/uc/account/v1/getUserDetailsInfo`,
    method: "get",
  });
}

/**
 * 修改用户密码
 */
 export const updatePassword = data => {
  return request({
    url: `/uc/user/v1/updatePassword`,
    method: "post",
    data
  })
}
