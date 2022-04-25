<template>
  <div class="examine">
    <div class="bidding_top">
      <div class="search">
        <img src="../assets/images/search_high.png" alt />
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
          @clear="dateClear"
        ></el-date-picker>
        <el-select v-model="statusValue" placeholder="审核状态" @change="statusChange">
          <el-option v-for="(item,index) in optionStatus" :key="item" :label="item" :value="index"></el-option>
        </el-select>
        <el-select v-model="levelValue" placeholder="用户级别" @change="levelChange">
          <el-option v-for="(item,index) in optionLevel" :key="item" :label="item" :value="index"></el-option>
        </el-select>
      </div>
    </div>

    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          background: '#E2ECFF',
          color: '#3B6DEE',
          'text-align': 'center',
        }"
        border
      >
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column label="发布人" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.username">{{scope.row.username}}</span>
            <i class="el-icon-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.company_name">{{scope.row.company_name}}</span>
            <i class="el-icon-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="审核类型" align="center">
          <template slot-scope="scope">
            <span v-if="active != 2">
              {{
              active == 1
              ? "招标发布"
              :active == 3?'企业认证'
              : ""
              }}
            </span>
            <span v-else>
              {{scope.row.type == 1 && active == 2
              ? "采购需求":scope.row.type == 1 &&active == 2?'工程需求':'服务需求'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="用户级别" align="center">
          <template slot-scope="scope">
            <span>{{ vip_level[scope.row.vip_level] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="提交审核时间" align="center">
          <template slot-scope="scope">
            <span
              :style="{
                color:
                  scope.row.ctime == '' || scope.row.certify_insert_time == '' || scope.row.start_time==''
                    ? '#ccc'
                    : '',
              }"
            >
              {{
              scope.row.ctime == "" || scope.row.certify_insert_time == "" || scope.row.start_time == ""
              ? "无"
              : scope.row.ctime || scope.row.certify_insert_time|| scope.row.start_time
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.check_time">{{ scope.row.check_time }}</span>
            <span v-if="scope.row.certify_time">{{ scope.row.certify_time }}</span>
            <i class="el-icon-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="审核标识" align="center">
          <template slot-scope="scope">
            <span v-if="active != '3'">
              {{
              status[scope.row.status]
              }}
            </span>
            <span v-else>
              {{
              statuss[scope.row.company_verify_status]
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div
              class="startbtn"
              :class="[scope.row.status == 0?'startbtn':'activelook']"
              @click="startBtn(scope.row)"
              v-if="active != '3'"
            >{{scope.row.status == 0?'开始审核':'查看'}}</div>
            <div
              :class="[scope.row.company_verify_status == 0 || scope.row.company_verify_status == 1?'startbtn':'activelook']"
              @click="startBtn(scope.row)"
              v-else
            >{{scope.row.company_verify_status == 0 || scope.row.company_verify_status == 1?'开始审核':'查看'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      vip_level: {
        0: "普通用户",
        1: "内测会员",
        2: "VIP会员",
      },
      status: {
        0: "待审核",
        1: "审核成功",
        2: "审核失败",
      },
      statuss: {
        0: "待审核",
        1: "待审核",
        2: "审核成功",
        3: "审核失败",
      },
      sName: "", //搜索值
      optionStatus: ["全部", "待审核", "审核成功", "审核失败"],
      optionLevel: ["全部", "游客", "普通用户", "内测会员", "VIP会员"],
      value: "",
      value1: "",
      timeValue: "", //时间绑定值
      statusValue: "", //审核状态绑定值
      levelValue: "", //用户级别绑定值
    };
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    total: {
      type: Number,
      default: function () {
        return 1;
      },
    },
    active: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  methods: {
    // 选择表格项
    startBtn(row) {
      this.$router.push({
        name: "Detail",
        query: { type: this.active, id: row.id },
      });
    },
    // 分页按钮点击
    currentChange(e) {
      this.$emit("pagenum", e);
    },
    // 时间筛选
    dateChange(e) {
      this.$emit("time", JSON.stringify(e));
    },
    // 审核状态
    statusChange(e) {
      this.$emit("is_certify", e);
      if (e == 0) {
        this.statusValue = "";
      }
    },
    // 用户级别
    levelChange(e) {
      this.$emit("vip_level", e);
      if (e == 0) {
        this.levelValue = "";
      }
    },
    // 时间选择清除
    dateClear() {
      console.log(111);
    },
    // 输入事件
    inputClick(e) {
      this.sName = e;
      if (this.sName == "") {
        this.sName = "";
        this.$emit("sName", this.sName);
      }
    },
    // 搜索事件
    clickSearch() {
      this.$emit("sName", this.sName);
    },
  },
};
</script>

<style lang="less" scoped>
.examine {
  .meun {
    margin-bottom: 30px;
  }
  .table {
    .startbtn {
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      box-shadow: 0px 4px 4px 0px rgba(86, 139, 243, 0.31);
      border-radius: 5px;
      margin: 0 auto;
      color: #fff;
      padding: 2px 0;
      cursor: pointer;
      width: 100px;
    }
    .activelook {
      color: #3b6dee;
      background: transparent;
      box-shadow: 0 0px 0px #ccc;
      cursor: pointer;
    }
    margin-bottom: 20px;
  }
  .pages {
    display: flex;
    justify-content: center;
  }
}
/deep/.el-menu.el-menu--horizontal {
  border: none;
}
/deep/.el-menu-item {
  color: #000a12;
  font-size: 18px;
  padding: 0 30px;
}
/deep/.el-menu-item.is-active {
  color: #386dee !important;
}
.bidding_top {
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
</style>