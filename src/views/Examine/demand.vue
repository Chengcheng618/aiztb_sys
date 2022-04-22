<template>
  <div class="demand">
    <Examine
      :tableData="tableData"
      @pagenum="getpage"
      :total="total"
      :active="'2'"
      @time="gettime"
      @is_certify="getcertify"
      @vip_level="getlevel"
    />
  </div>
</template>

<script>
import Examine from "../../component/examine.vue";
export default {
  data() {
    return {
      pageNum: 1,
      tableData: [],
      total: 0,
      is_certify: "", //审核标识
      vip_level: "", //用户级别
    };
  },
  components: {
    Examine,
  },
  methods: {
    getlist(start_time, end_time) {
      let params = {
        page: this.pageNum,
        num: 10,
        is_certify: this.is_certify,
        start_time,
        end_time,
        vip_level: this.vip_level,
      };
      this.$axiosGet("/require/list", params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.getpageInfo();
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
      this.$axiosGet("/require/pageInfo", {}).then((res) => {
        if (res.code == 200) {
          this.total = res.data;
        }
      });
    },
    // 传递过来的时间值
    gettime(e) {
      let time = JSON.parse(e);
      if (time == null) {
        time = ["", ""];
      }
      this.getlist(time[0], time[1]);
    },
    // 传递的审核状态
    getcertify(e) {
      switch (e) {
        case 0:
          this.is_certify = "";
          break;
        case 1:
          this.is_certify = 0;
          break;
        case 2:
          this.is_certify = 1;
          break;
        case 3:
          this.is_certify = 2;
          break;

        default:
          break;
      }
      this.getlist("", "");
    },
    // 传递的用户级别
    getlevel(e) {
      switch (e) {
        case 0:
          this.vip_level = "";
          break;
        case 1:
          this.vip_level = 0;
          break;
        case 2:
          this.vip_level = 1;
          break;
        case 3:
          this.vip_level = 2;
          break;

        default:
          break;
      }
      this.getlist("", "");
    },
  },
  created() {
    this.getlist("", "");
  },
};
</script>

<style lang="less" scoped>
.bidding {
}
</style>