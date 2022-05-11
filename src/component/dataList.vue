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
        <el-table-column :label="item.label" v-for="(item,index) in headList" :key="index">
          <template slot-scope="scope">
            <div v-if="item.label != '用户级别' && item.label != '企业认证状态' && item.label != '操作'">
              <span v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
              <i class="el-icon-minus" v-else></i>
            </div>
            <span v-if="item.label == '用户级别'">{{vip_level[scope.row[item.prop]]}}</span>
            <span v-if="item.label == '企业认证状态'">{{status[scope.row[item.prop]]}}</span>
            <el-button
              v-if="item.label == '操作'"
              size="mini"
              class="lookInfo"
              @click="clickdetails(scope.row.id)"
            >查看信息</el-button>
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
  props: {
    type: {
      type: Number,
      default: function () {
        return 0;
      },
    },
  },
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
      headList: [],
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
      this.getjudge();
    },
    // 企业认证状态
    statusChange(e) {
      if (e == 0) {
        e = "";
        this.statusValue = "";
      }
      this.verify_status = e;
      this.getjudge();
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
      this.getjudge();
    },
    //分页
    currentChange(e) {
      this.pageNum = e;
      this.getjudge();
    },
    // 输入事件
    inputClick(e) {
      this.sName = e;
      if (this.sName == "") {
        this.getjudge();
      }
    },
    // 搜索事件
    clickSearch() {
      this.getjudge();
    },
    // 获取数据中心用户列表
    getUserList(url) {
      let params = {
        page: this.pageNum,
        num: 10,
        keywords: this.sName,
        start_time: this.start_time,
        end_time: this.end_time,
        vip_level: this.level,
      };
      if (this.type == 1) {
        params["company_verify_status"] = this.verify_status;
      } else if (this.type == 2) {
        params["is_certify"] = this.verify_status;
      }
      this.$axiosGet(url, params).then((res) => {
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    // 查看信息
    clickdetails(id) {
      this.$router.push({
        name: this.type == 1 ? "UserinfoDeatils" : "CompanyinfoDeatils",
      });
      if (this.type == 1) {
        window.sessionStorage.setItem("ID", id);
      } else {
        window.sessionStorage.setItem("company_ID", id);
      }
    },
    getjudge() {
      if (this.type == 1) {
        // 获取数据中心用户列表
        this.getUserList("/statistics/getDataCenterUserList");
        this.headList = [
          { label: "ID", prop: "id" },
          { label: "昵称", prop: "username" },
          { label: "联系方式", prop: "mobile" },
          { label: "用户级别", prop: "vip_level" },
          { label: "企业认证状态", prop: "company_verify_status" },
          { label: "注册时间", prop: "ctime" },
          { label: "操作", prop: "" },
        ];
      } else if (this.type == 2) {
        this.getUserList("/statistics/getDataCenterCompanyList");
        this.headList = [
          { label: "企业名称 ", prop: "company_name" },
          { label: "企业成员数量", prop: "member_count" },
          { label: "企业主营项目量", prop: "company_supply_count" },
          { label: "企业发布数量", prop: "company_publish_count" },
          { label: "认证时间", prop: "certify_time" },
          { label: "操作", prop: "" },
        ];
      }
    },
  },
  created() {
    this.getjudge();
  },
};
</script>

<style lang="less" scoped>
.userinfo {
  .userinfo_top {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .search {
      display: flex;
      align-items: center;
      width: 442px;
      height: 36px;
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid #e4e4e4;

      img {
        width: 31px;
        height: 34px;
        padding-left: 11px;
      }

      .el-input {
        height: 34px;
      }

      .searchBtn {
        border-left: 1px solid #e4e4e4;
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 9px;
        color: #000a12;
        line-height: 29px;
        cursor: pointer;
      }
    }

    .select_group {
      margin-left: 100px;
      display: flex;
      align-items: center;

      .el-select {
        height: 36px;
        margin-left: 30px;

        .el-input {
          height: 34px;
        }
      }
    }
  }

  .table {
    .lookInfo {
      border: none !important;
      font-size: 14px;
      font-weight: 400;
      color: #7fa3ff;
      line-height: 16px;
      background: transparent;

      &:hover {
        background: transparent;
      }
    }

    .pages {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
}

/deep/.el-table {
  .el-table__cell {
    text-align: center;
  }
}
</style>