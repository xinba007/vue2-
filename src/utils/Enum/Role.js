/**
 * 1：全数据  2：本公司数据  4：本部门数据  8：仅本人数据  16：自定义数据
 * @readonly
 * @enum {number}
 */
export const DataAuth = {
  /** 1：全数据 */
  ALL: 1,
  /** 2：本公司数据 */
  COMPANY: 2,
  /** 4：本部门数据 */
  DEPT: 4,
  /** 8：仅本人数据 */
  SELF: 8,
  /** 16：自定义数据 */
  CUSTOM: 16,
};

/**
 * 角色类型
 * @readonly
 * @enum {string}
 */
export const RoleType = {
  /** 其他 */
  OTHER: "0",
  /** 销售 */
  SALE: "1",
  /** 运营 */
  OPERATE: "2",
  /** 讲师 */
  LECTURER: "3",
  /** 兼职讲师 */
  ADJUNCT_INSTRUCTOR: "4",
  /** 人力资源 */
  HR: "5",
  /** 写手 */
  WRITER: "6",
  /** 兼职写手 */
  ADJUNCT_WRITER: "7",
  /** 渠道 */
  CHANNEL: "8",
  /** 市场 */
  MARKET: "9",
  /** 前端开发 */
  FRONT_END: "10",
  /** 后端开发 */
  BACK_END: "11",
  /** 产品 */
  PRODUCT: "12",
  /** 测试 */
  TEST: "13",
  /** 运维 */
  DEVOPS: "14",
  /** 财务 */
  FINANCE: "15",
  /** 管理员 */
  ADMIN: "16",
};
