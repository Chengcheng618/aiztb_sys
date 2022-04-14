<template>
  <div class="bidding">
    <Examine :tableData="tableData" @pagenum="getpage" :total="total" :active="'1'"/>
  </div>
</template>

<script>
import Examine from "../../component/examine.vue";
export default {
  data() {
    return {
      pageNum: 1,
      tableData: [],
      total:0
    };
  },
  components: {
    Examine,
  },
  methods: {
    getlist() {
      let params = {
        page: this.pageNum,
        num: 10,
      };
      this.$axiosGet("/content/list", params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.getpageInfo()
        }
      });
    },
    // 获取传递过来的页数
    getpage(e) {
      this.pageNum = e;
      this.getlist();
    },
    // 列表总数
    getpageInfo() {
      this.$axiosGet('/content/pageInfo', {}).then((res) => {
        if (res.code == 200) {
          this.total = res.data;
        }
      });
    },
  },
  created() {
    this.getlist();
  },
};
</script>

<style lang="less" scoped>
.bidding {
}
</style>