<template>
  <div class="record">
    <div class="goback">
      <el-page-header @back="goBack" :content="type == 1 ? '访问记录' : '充值地区排名'" style="width:200px"></el-page-header>
      <ul class="total" v-if="type == 1 ">
        <li v-for="(item,index) in totalList" :key="index">
          <span>{{item.title}}：</span>
          <p>
            <span>{{item.num}}</span>
            <span>{{index == 0 || index == 2 ? '次' :'人'}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="table">
      <el-table
        :data="visit"
        style="width: 100%"
        :header-cell-style="{
          background: '#E2ECFF',
          color: '#3B6DEE',
          'text-align': 'center',
        }"
        border
      >
        <el-table-column prop="id" :label="type == 1?'ID':'排名'"></el-table-column>
        <el-table-column :prop="type == 1?'username':'area'" :label="type == 1?'昵称':'地区'"></el-table-column>
        <el-table-column :prop="type == 1?'mobile':'charge_count'" :label="type == 1?'联系方式':'充值人数'"></el-table-column>
        <el-table-column prop="address" label="用户级别" v-if="type == 1">
          <template slot-scope="scope">
            <span>
              {{
              vip_level[scope.row.vip_level]
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :prop="type == 1?'last_login':'charge_money'"
          :label="type == 1?'访问时间':'充值金额'"
        ></el-table-column>
        <el-table-column prop="address" label="驻留时长" v-if="type == 1"></el-table-column>
        <el-table-column label="操作" v-if="type == 1">
          <template>
            <el-button size="mini" class="lookInfo">查看信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pages" v-if="total > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { unitConvert } from "@/utils/money";
export default {
  data() {
    return {
      totalList: [
        { title: "今日访问量", num: 2139 },
        { title: "今日访问人数", num: 2139 },
        { title: "历史访问量", num: 2139 },
        { title: "历史访问人数", num: 2139 },
      ],
      vip_level: {
        0: "普通用户",
        1: "内测会员",
        2: "VIP会员",
        3: "游客",
      },
      pageNum: 1,
      visit: [], //渲染列表
      total: 1, //翻页总条数
      type: "", //区分从哪个页面跳转
    };
  },
  methods: {
    getList() {
      this.$axiosGet("/statistics/indexVisitRecord", {
        page: this.pageNum,
        num: 10,
      }).then((res) => {
        this.visit = res.data.visit;
        this.total = res.data.count;
        this.totalList[0].num = res.data.total.visit_today_count;
        this.totalList[1].num = res.data.total.visit_today_user;
        this.totalList[2].num = res.data.total.history_total_count;
        this.totalList[3].num = res.data.total.history_total_user;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    currentChange(e) {
      this.pageNum = e;
      if (this.type == 1) {
        this.getList();
      } else {
        this.getChargeare();
      }
    },
    getChargeare(time) {
      this.$axiosGet("/statistics/userChargeArea", {
        page: this.pageNum,
        num: 10,
        time,
      }).then((res) => {
        for (const obj of res.data) {
          obj.charge_money =
            unitConvert(obj.charge_money).num +
            unitConvert(obj.charge_money).unit;
        }
        this.visit = res.data;
      });
    },
  },
  created() {
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.getList();
    } else {
      this.getChargeare(this.$route.query.time);
    }
  },
};
</script>

<style lang="less" scoped>
@import "./record.less";
</style>