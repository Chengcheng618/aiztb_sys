<template>
  <div class="attestation">
    <Examine
      :tableData="tableData"
      @pagenum="getpage"
      :total="total"
      :active="'3'"
      @time="gettime"
      @is_certify="getcertify"
      @vip_level="getlevel"
      @sName="getsName"
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
      start_time: "", //开始时间
      end_time: "", //结束时间
      searchName: "", //搜索值
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
        keywords: this.searchName,
      };
      this.$axiosGet("/company/list", params).then((res) => {
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
      this.$axiosGet("/company/pageInfo", {}).then((res) => {
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
      this.start_time = time[0];
      this.end_time = time[1];
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
      this.getlist(this.start_time, this.end_time);
    },
    // 传递的用户级别
    getlevel(e) {
      switch (e) {
        case 0:
          this.vip_level = "";
          break;
        case 1:
          this.vip_level = 4;
          break;
        case 2:
          this.vip_level = 1;
          break;
        case 3:
          this.vip_level = 2;
          break;
        case 4:
          this.vip_level = 3;
          break;

        default:
          break;
      }
      this.getlist(this.start_time, this.end_time);
    },
    // 搜索
    getsName(e) {
      this.searchName = e;
      this.getlist(this.start_time, this.end_time);
    },
  },
  created() {
    this.getlist(this.start_time, this.end_time);
  },
};
</script>

<style lang="less" scoped>
.bidding {
}
</style>