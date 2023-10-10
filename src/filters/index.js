import moment from "moment";
export default {
  /* 格式化日期 */
  fmtYMD(val) {
    if (!val) return;
    return moment(val).format("YYYY-MM-DD");
  },
};
