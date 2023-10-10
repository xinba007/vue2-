/* 基础数据管理 */

/**
 * 地区类型
 * @readonly
 * @enum {number}
 */
export const AreaType = {
  /** 省 */
  PROVINCE: 1,
  /** 市 */
  CITY: 2,
  /** 县 */
  COUNTY: 3,
};

/**
 * 银行卡 首款方式
 * @readonly
 * @enum {number}
 */
export const PayFor = {
  /** @type {number} 银行转账 */
  TRANSFER: 1,
  /** 支付宝 */
  ALIPAY: 2,
  /** 微信 */
  WECHAT: 3,
  /** paypal */
  PAYPAL: 4,
};

/**
 * 学科 审核 状态
 * 0待审核 1已发布
 * @readonly
 * @enum {number}
 */
export const SubjectExamineStatus = {
  /** 0待审核 */
  TO_BE_REVIEWED: 0,
  /** 1已发布 */
  RELEASED: 1,
};
