<template>
  <div class="head">
    <i class="el-icon-d-arrow-left" @click="onPrev"></i>
    <i class="el-icon-date"></i>{{date}}
    <i class="el-icon-d-arrow-right" @click="onNext"></i>
  </div>
</template>
<script>
import utils from '@/utils/utils'
export default {
  data() {
    return {
      date: "",
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  mounted () {
    this.onCurrDate()
  },
  methods: {
    onCurrDate() {
      const date = utils.getNowMonth(this.language)
      const _date = utils.getPreMonth(this.language, date.dateName)
      this.date = _date.dateName
      this.$emit('change', _date.dateValue)
    },
    onPrev() {
      const date = utils.getPreMonth(this.language, this.date)
      this.date = date.dateName
      this.$emit('change', date.dateValue)
    },
    onNext() {
      const date = utils.getNextMonth(this.language, this.date)
      this.date = date.dateName
      this.$emit('change', date.dateValue)
    },
    resetFields() {
      this.onCurrDate()
    }
  }
}
</script>
<style lang="scss" scoped>
.head{
  text-align: center;
  line-height: 40px;
  font-size: 22px;
  margin-bottom: 10px;
  .el-icon-date,
  .el-icon-d-arrow-left,
  .el-icon-d-arrow-right{
    margin: 0 10px;
  }
  .el-icon-d-arrow-left,
  .el-icon-d-arrow-right{
    &:hover{
      cursor: pointer;
      color: #4979FF;
    }
  }
}
</style>