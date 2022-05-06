<template>
  <div class="userinfo">
    <div class="userinfo_top">
      <div class="search">
        <img src="@/assets/images/search_high.png" alt />
        <el-input v-model="sName" placeholder="请输入内容" @input="inputClick" clearable></el-input>
        <div class="searchBtn" @click="clickSearch">搜索</div>
      </div>
      <div class="select_group">
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="dateChange"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select v-model="statusValue" placeholder="企业认证状态" @change="statusChange">
          <el-option v-for="(item,index) in optionStatus" :key="item" :label="item" :value="index"></el-option>
        </el-select>
        <el-select v-model="levelValue" placeholder="用户级别" @change="levelChange">
          <el-option v-for="(item,index) in optionLevel" :key="item" :label="item" :value="index"></el-option>
        </el-select>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          background: '#E2ECFF',
          color: '#3B6DEE',
          'text-align': 'center',
        }"
        border
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="联系方式">
          <template slot-scope="scope">
            <span v-if="scope.row.mobile">{{scope.row.mobile}}</span>
            <i class="el-icon-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="vip_level" label="用户级别">
          <template slot-scope="scope">
            <span>{{vip_level[scope.row.vip_level]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company_verify_status" label="企业认证状态">
          <template slot-scope="scope">
            <span>{{status[scope.row.company_verify_status]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="注册时间"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" class="lookInfo" @click="clickdetails">查看信息</el-button>
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
export default {
  data() {
    return {
      statusValue: "",
      levelValue: "",
      optionLevel: ["全部", "游客", "普通用户", "内测会员", "VIP会员"],
      optionStatus: ["全部", "未认证", "已认证"],
      tableData: [],
      total: 1,
      pageNum: 1,
      timeValue: "",
      sName: "",
      vip_level: {
        1: "普通用户",
        2: "内测会员",
        3: "VIP会员",
        4: "游客",
      },
      status: {
        1: "未认证",
        2: "已认证",
      },
      start_time: "", //开始时间
      end_time: "", //结束时间
      verify_status: "", //企业认证状态
      level: "", //VIP等级
    };
  },
  methods: {
    // 时间筛选
    dateChange(e) {
      if (e == null) {
        e = ["", ""];
      }
      this.start_time = e[0];
      this.end_time = e[1];
      this.getUserList();
    },
    // 企业认证状态
    statusChange(e) {
      if (e == 0) {
        e = "";
        this.statusValue = "";
      }
      this.verify_status = e;
      this.getUserList();
    },
    // 用户级别
    levelChange(e) {
      switch (e) {
        case 0:
          this.level = "";
          this.levelValue = "";
          break;
        case 1:
          this.level = 4;
          break;
        case 2:
          this.level = 1;
          break;
        case 3:
          this.level = 2;
          break;
        case 4:
          this.level = 3;
          break;

        default:
          break;
      }
      this.getUserList();
    },
    //分页
    currentChange(e) {
      this.pageNum = e;
      this.getUserList();
    },
    // 输入事件
    inputClick(e) {
      this.sName = e;
      if (this.sName == "") {
        this.getUserList();
      }
    },
    // 搜索事件
    clickSearch() {
      this.getUserList();
    },
    // 获取数据中心用户列表
    getUserList() {
      let params = {
        page: this.pageNum,
        num: 10,
        keywords: this.sName,
        start_time: this.start_time,
        end_time: this.end_time,
        company_verify_status: this.verify_status,
        vip_level: this.level,
      };
      this.$axiosGet("/statistics/getDataCenterUserList", params).then(
        (res) => {
          this.tableData = res.data;
          this.getPageInfo();
        }
      );
    },
    // 获取列表总页数
    getPageInfo() {
      this.$axiosGet("/statistics/getDataCenterUserListPageInfo", {}).then(
        (res) => {
          this.total = res.data;
        }
      );
    },
    // 查看信息
    clickdetails() {
      this.$router.push({
        name: "UserinfoDeatils",
      });
    },
  },
  created() {
    // 获取数据中心用户列表
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
@import "./userinfo.less";
</style>