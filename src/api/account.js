import request from "@/utils/Request";
import { Prefix } from "config";


/**
 * 根据部门ID获取员工信息
 * @param {Number} deptId 部门ID
 */
export const getAccountList = (data) => {
//   localStorage.setItem('EL-ADMIN-TOEKN',"e8b02a112d53096e938174470950a304")
  return request({
    url: `${Prefix}/business/v1/pageList?allData=false`,
    method: "post",
    data,
  });
};
export const changeLogs = (params) => {
    return request({
        url: `${Prefix}/business/v1/changeLogs/` + params.id,
        method: "get",
        params,
    });
};

export const getSaleEmplsByDeptId = (deptId) => {
    return request({
        url: `${Prefix}/dept/v1/getSaleEmplsByDeptId/` + deptId,
        method: "get",
    });
};

export const updateEmplId = (data) => {
    return request({
        url: `${Prefix}/business/v1/update`,
        method: "put",
        data
    });
}

export const unbind = (data) => {
    return request({
        url: `${Prefix}/business/v1/unbind?businessId=${data.businessId}&oldEmplName=` + data.emplName,
        method: "put"
    });
}