import request from "@/utils/Request";
// vip 提示语
export const getVipReasonList = params => request({
    url: `/oper/sys/order/v1/getVipReasonList`,
    method: "get",
    params
  });
