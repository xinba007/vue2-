import request from "@/utils/Request";
import { OSS_URL } from "config";

/**
 * 获取oss 私钥
 */
export const getAliOSSUploadSign = (dir) => {
  return request({
    url: `/oss/getAliOSSUploadSign?dir=${dir}/${Date.now()}`,
    method: "get",
  });
};

/**
 * 附件上传 
 */
export const ossUpload = async (file, _dir) => {
  const { status, body } = await getAliOSSUploadSign(_dir);
  const { dir, signature, accessid, policy, host } = body;
  let data = new FormData();
  data.append("name", file.name);
  data.append("key", dir + file.name);
  data.append("signature", signature);
  data.append("success_action_status", 200);
  data.append("OSSAccessKeyId", accessid);
  data.append("policy", policy);
  data.append("host", host);
  data.append("file", file);
  if (status === 200) {
    await request({
      url: OSS_URL,
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: 200,
      body: host + "/" + dir + file.name,
    };
  } else throw "获取oss 私钥 异常";
};
